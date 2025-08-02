import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  autoReplyTemplateId: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'YOUR_AUTOREPLY_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

if (EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAIL_CONFIG.publicKey);
}

export const sendEmail = async (formData) => {
  try {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return { 
        success: false, 
        message: 'All fields are required' 
      };
    }

    const mainEmailParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email
    };

    const mainResponse = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      mainEmailParams
    );

    const autoReplyParams = {
      to_name: formData.name,
      to_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    if (EMAIL_CONFIG.autoReplyTemplateId !== 'YOUR_AUTOREPLY_TEMPLATE_ID') {
      try {
        await emailjs.send(
          EMAIL_CONFIG.serviceId,
          EMAIL_CONFIG.autoReplyTemplateId,
          autoReplyParams
        );
        console.log('Auto-reply sent successfully');
      } catch (autoReplyError) {
        console.warn('Auto-reply failed, but main email was sent:', autoReplyError);
      }
    }

    console.log('Email sent successfully:', mainResponse.status);
    
    return { 
      success: true, 
      message: 'Message sent successfully! You\'ll receive a confirmation email shortly.' 
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    
    let errorMessage = 'Failed to send email. Please try again.';
    
    if (error.text && error.text.includes('Invalid')) {
      errorMessage = 'Email configuration error. Please contact me directly at guptasahil2175@gmail.com';
    } else if (error.text && error.text.includes('network')) {
      errorMessage = 'Network error. Please check your connection and try again.';
    }
    
    return { 
      success: false, 
      message: errorMessage
    };
  }
};
