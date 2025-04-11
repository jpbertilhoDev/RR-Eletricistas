
import emailjs from '@emailjs/browser';

// Configuração do EmailJS
export const emailjsConfig = {
  serviceId: 'service_vzx0egs',
  templateId: 'template_13j3vpk', 
  publicKey: '5jyuzgaYd8OpVu3hd',
};

// Inicializa o EmailJS com sua chave pública
emailjs.init({
  publicKey: emailjsConfig.publicKey,
  limitRate: true
});

// Interface para os dados do formulário de contato
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Função para enviar email
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Não informado',
      service: formData.service || 'Não especificado',
      message: formData.message,
      to_name: 'RR Manutenções Elétricas', // Nome do destinatário
      reply_to: formData.email,
      // Campos exatos do template do EmailJS
      Nome: formData.name,
      Email: formData.email,
      Telefone: formData.phone || 'Não informado',
      Serviço: formData.service || 'Não especificado',
      Mensagem: formData.message
    };

    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams
    );

    return {
      success: true,
      message: 'Email enviado com sucesso! Entraremos em contato em breve.',
    };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao enviar o email. Por favor, tente novamente mais tarde.',
    };
  }
};
