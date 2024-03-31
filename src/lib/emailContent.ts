const generateHTML = (title: string, message: string) => {
  return `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>${title}</h2> <div class="form-container">${message}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
}

export const generateVerificationEmailContent = (verificationLink: string) => {
  const textData = `Hola,\n\nPor favor verifica tu cuenta haciendo click en el siguiente enlace: \n${verificationLink}`
  const htmlData = `<h1 class="form-heading" align="left">Hola,<h1/><p class="form-answer" align="left">Por favor verifica tu cuenta haciendo click en el siguiente enlace:</p><a href="${verificationLink}">${verificationLink}</a>`
  return {
    text: textData,
    html: generateHTML('Verificación de correo para PsikoGames', htmlData)
  }
}

export const generatePasswordResetEmailContent = (resetLink: string) => {
  const textData = `Hola,\n\nHas solicitado restablecer tu contraseña. Por favor, haz click en el siguiente enlace para restablecerla: \n${resetLink} \n\nSi no has solicitado un restablecimiento de contraseña, por favor ignora este correo electrónico.`
  const htmlData = `<h1 class="form-heading" align="left">Hola,<h1/><p class="form-answer" align="left">Has solicitado restablecer tu contraseña. Por favor, haz click en el siguiente enlace para restablecerla:</p><a href="${resetLink}">${resetLink}</a><p class="form-answer" align="left">Si no has solicitado un restablecimiento de contraseña, por favor ignora este correo electrónico.</p>`
  return {
    text: textData,
    html: generateHTML('Restablecimiento de contraseña en PsikoGames', htmlData)
  }
}

export const generate2FAEmailContent = (TwoFactorCode: string) => {
  const textData = `Hola,\n\nEl siguiente es el codigo de doble autenticación: \n${TwoFactorCode} \n\n Copia y pega este código en la aplicación para completar el proceso.`
  const htmlData = `<h1 class="form-heading" align="left">Hola,<h1/><p class="form-answer" align="left">El siguiente es el codigo de doble autenticación:</p><p class="form-answer" align="left">${TwoFactorCode}</p><p class="form-answer" align="left">Copia y pega este código en la aplicación para completar el proceso.</p>`
  return {
    text: textData,
    html: generateHTML('Verificación de cuenta (2FA)', htmlData)
  }
}
