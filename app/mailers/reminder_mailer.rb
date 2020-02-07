class ReminderMailer < ApplicationMailer

  default  template_path: 'mailer/reminder'


  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.reminder_mailer.reminder_mail.subject
  #
  def reminder_mail
    @greeting = "Hi"

    mail to: "coccoboy_am@yahoo.co.jp", subject: "Account activation"
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.reminder_mailer.password_mail.subject
  #
  def password_mail
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
