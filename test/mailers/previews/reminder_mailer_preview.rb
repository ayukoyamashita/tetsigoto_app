# Preview all emails at http://localhost:3000/rails/mailers/reminder_mailer
class ReminderMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/reminder_mailer/reminder_mail
  def reminder_mail
    ReminderMailer.reminder_mail
  end

  # Preview this email at http://localhost:3000/rails/mailers/reminder_mailer/password_mail
  def password_mail
    ReminderMailer.password_mail
  end

end
