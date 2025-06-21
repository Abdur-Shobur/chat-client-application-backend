import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CustomConfigService } from 'src/config/config.service';

@Injectable()
export class EmailService {
  constructor(private readonly config: CustomConfigService) {}

  private transporter = nodemailer.createTransport({
    secure: true,
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: this.config.email, // Environment variable for email
      pass: this.config.emailPassword, // Environment variable for password
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: 'Your OTP Code',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                  </div>
                  <p style="font-size:1.1em">Hi,</p>
                  <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                  <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                  </div>
                </div>
            </div>`,
    };

    const res = await this.transporter.sendMail(mailOptions);
  }
}
