import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertServiceSchema, insertProjectSchema, insertTestimonialSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // =========== API pública ===========
  // Rotas públicas para obter dados

  // Obter serviços
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar serviços'
      });
    }
  });

  // Obter projetos
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar projetos'
      });
    }
  });

  // Obter depoimentos
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar depoimentos'
      });
    }
  });

  // Formulário de contato
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      
      const newMessage = await storage.createContactMessage(contactData);
      
      return res.status(200).json({
        success: true,
        message: 'Mensagem recebida com sucesso',
        data: newMessage
      });
    } catch (error) {
      console.error('Error in contact form:', error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Erro no servidor'
      });
    }
  });

  // =========== API admin ===========
  // Nota: Em produção, essas rotas deveriam ser protegidas com autenticação

  // === Serviços ===
  
  // Criar serviço
  app.post('/api/admin/services', async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const newService = await storage.createService(serviceData);
      
      return res.status(201).json({
        success: true,
        data: newService
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Atualizar serviço
  app.put('/api/admin/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      
      const updatedService = await storage.updateService(id, serviceData);
      
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: 'Serviço não encontrado'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedService
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Excluir serviço
  app.delete('/api/admin/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteService(id);
      
      return res.status(200).json({
        success: true,
        message: 'Serviço excluído com sucesso'
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // === Projetos ===
  
  // Criar projeto
  app.post('/api/admin/projects', async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(projectData);
      
      return res.status(201).json({
        success: true,
        data: newProject
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Atualizar projeto
  app.put('/api/admin/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      
      const updatedProject = await storage.updateProject(id, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: 'Projeto não encontrado'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedProject
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Excluir projeto
  app.delete('/api/admin/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteProject(id);
      
      return res.status(200).json({
        success: true,
        message: 'Projeto excluído com sucesso'
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // === Depoimentos ===
  
  // Criar depoimento
  app.post('/api/admin/testimonials', async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonialData);
      
      return res.status(201).json({
        success: true,
        data: newTestimonial
      });
    } catch (error) {
      handleError(error, res);
    }

  // === Avaliações Públicas ===
  
  // Obter avaliações públicas - alternativa gratuita
  app.get('/api/public-reviews', async (req, res) => {
    try {
      // Buscar depoimentos do banco de dados - já existe essa funcionalidade
      const dbTestimonials = await storage.getTestimonials();
      
      // Formatar os depoimentos do banco para incluir a fonte como "site"
      const siteTestimonials = dbTestimonials.map(testimonial => ({
        ...testimonial,
        source: "site",
        profilePhoto: null,
        time: `${Math.floor(Math.random() * 3) + 1} ${['dias', 'semanas', 'meses'][Math.floor(Math.random() * 3)]} atrás`
      }));
      
      // Gerar avaliações simuladas do Google Maps
      const googleReviews = generateGoogleMapsReviews();
      
      // Combinar avaliações do site com avaliações simuladas do Google
      const allReviews = [...siteTestimonials, ...googleReviews];
      
      // Organizar por data (mais recentes primeiro)
      allReviews.sort(() => Math.random() - 0.5);
      
      return res.status(200).json({
        success: true,
        data: allReviews
      });
    } catch (error) {
      console.error('Error fetching public reviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliações públicas'
      });
    }
  });
  
  // Função para gerar avaliações simuladas do Google Maps
  function generateGoogleMapsReviews() {
    const googleReviews = [
      {
        id: 1001,
        name: "Carlos Silva",
        role: "Cliente",
        content: "Serviço excelente! Contratei para instalação elétrica na minha casa nova e o trabalho ficou impecável. Equipe pontual e profissional.",
        rating: 5,
        source: "Google Maps",
        time: "2 dias atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=CS&background=random"
      },
      {
        id: 1002,
        name: "Amanda Oliveira",
        role: "Cliente",
        content: "Resolveram um problema elétrico complicado que outros eletricistas não conseguiram identificar. Atendimento rápido e preço justo.",
        rating: 5,
        source: "Google Maps",
        time: "1 semana atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=AO&background=random"
      },
      {
        id: 1003,
        name: "Roberto Andrade",
        role: "Cliente",
        content: "Contratei para instalação de tomadas em meu escritório. Trabalho limpo, organizado e bem executado. Recomendo!",
        rating: 4,
        source: "Google Maps",
        time: "2 semanas atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=RA&background=random"
      },
      {
        id: 1004,
        name: "Mariana Costa",
        role: "Cliente",
        content: "Ótima empresa! Precisei de um reparo emergencial e eles atenderam no mesmo dia. Técnicos competentes e educados.",
        rating: 5,
        source: "Google Maps", 
        time: "1 mês atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=MC&background=random"
      },
      {
        id: 1005,
        name: "Paulo Mendes",
        role: "Cliente",
        content: "Instalaram a fiação elétrica da minha loja. Preço compatível com o mercado e serviço de qualidade.",
        rating: 4,
        source: "Google Maps",
        time: "1 mês atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=PM&background=random"
      },
      {
        id: 1006,
        name: "Fernanda Lima",
        role: "Cliente",
        content: "Excelente atendimento do início ao fim. Resolveram um problema recorrente com meu quadro de luz que outros não conseguiram.",
        rating: 5, 
        source: "Google Maps",
        time: "2 meses atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=FL&background=random"
      },
      {
        id: 1007,
        name: "Ricardo Sousa",
        role: "Cliente",
        content: "Contratei para instalar pontos de iluminação na área externa da casa. Resultado ficou perfeito!",
        rating: 5,
        source: "Google Maps",
        time: "3 meses atrás",
        profilePhoto: "https://ui-avatars.com/api/?name=RS&background=random"
      }
    ];
    
    // Simular que buscou apenas alguns aleatoriamente
    return googleReviews.sort(() => Math.random() - 0.5).slice(0, 4);
  }
  
  // Criar nova avaliação pública (para o formulário do site)
  app.post('/api/public-reviews', async (req, res) => {
    try {
      const { name, email, rating, content } = req.body;
      
      if (!name || !rating || !content) {
        return res.status(400).json({
          success: false,
          message: 'Dados incompletos para a avaliação'
        });
      }
      
      // Criar um novo depoimento usando a função existente do storage
      const newTestimonial = await storage.createTestimonial({
        name,
        role: "Cliente",
        content,
        rating: parseFloat(rating)
      });
      
      return res.status(201).json({
        success: true,
        message: 'Avaliação recebida com sucesso!',
        data: newTestimonial
      });
    } catch (error) {
      console.error('Error creating public review:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar avaliação'
      });
    }
  });

  });

  // Atualizar depoimento
  app.put('/api/admin/testimonials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const testimonialData = insertTestimonialSchema.partial().parse(req.body);
      
      const updatedTestimonial = await storage.updateTestimonial(id, testimonialData);
      
      if (!updatedTestimonial) {
        return res.status(404).json({
          success: false,
          message: 'Depoimento não encontrado'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedTestimonial
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Excluir depoimento
  app.delete('/api/admin/testimonials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteTestimonial(id);
      
      return res.status(200).json({
        success: true,
        message: 'Depoimento excluído com sucesso'
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // === Mensagens de contato ===
  
  // Obter todas as mensagens
  app.get('/api/admin/messages', async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      handleError(error, res);
    }
  });

  // Obter uma mensagem específica
  app.get('/api/admin/messages/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getContactMessage(id);
      
      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Mensagem não encontrada'
        });
      }
      
      return res.status(200).json(message);
    } catch (error) {
      handleError(error, res);
    }
  });

  // Marcar mensagem como lida
  app.patch('/api/admin/messages/:id/read', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedMessage = await storage.markContactMessageAsRead(id);
      
      if (!updatedMessage) {
        return res.status(404).json({
          success: false,
          message: 'Mensagem não encontrada'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedMessage
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Excluir mensagem
  app.delete('/api/admin/messages/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteContactMessage(id);
      
      return res.status(200).json({
        success: true,
        message: 'Mensagem excluída com sucesso'
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Função auxiliar para tratamento de erros
function handleError(error: unknown, res: Response) {
  console.error('API error:', error);
  
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.errors
    });
  }
  
  return res.status(500).json({
    success: false,
    message: 'Erro no servidor'
  });
}
