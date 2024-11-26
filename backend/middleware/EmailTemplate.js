const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
  </head>
  <body>
      <div>
          <h1>Verify Your Email</h1>
          <p>Hello,</p>
          <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
          <span>{verificationCode}</span>
          <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
      </div>
  </body>
  </html>
`;

const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
  </head>
  <body>
      <div>
          <h1>Welcome to Our Community!</h1>
          <p>Hello {name},</p>
          <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
      </div>
  </body>
  </html>
`;

module.exports = {
  Verification_Email_Template,
  Welcome_Email_Template
};
