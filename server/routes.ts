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

  // === Google Reviews ===
  
  // Obter avaliações do Google
  app.get('/api/google-reviews', async (req, res) => {
    try {
      const { GOOGLE_PLACES_API_KEY } = process.env;
      const PLACE_ID = process.env.GOOGLE_PLACE_ID; // ID do seu negócio no Google
      
      if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) {
        return res.status(500).json({
          success: false,
          message: 'Chaves de API do Google Places não configuradas'
        });
      }
      
      // URL para buscar detalhes do lugar, incluindo avaliações
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_PLACES_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK') {
        return res.status(500).json({
          success: false,
          message: 'Erro ao buscar avaliações do Google',
          error: data.status
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          rating: data.result.rating,
          reviews: data.result.reviews
        }
      });
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliações do Google'
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
