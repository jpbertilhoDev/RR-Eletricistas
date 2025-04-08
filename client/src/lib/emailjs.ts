import emailjs from '@emailjs/browser';

// Configuração do EmailJS
export const emailjsConfig = {
  serviceId: 'service_x1mcj9d', // Você precisará substituir pelo seu Service ID
  templateId: 'template_eaz1i6k', // Você precisará substituir pelo seu Template ID
  publicKey: 'G5SQ78QAlqCOZqnz0', // Você precisará substituir pela sua Public Key
};

// Inicializa o EmailJS com sua chave pública
emailjs.init(emailjsConfig.publicKey);

// Interface para os dados do formulário de contato
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
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