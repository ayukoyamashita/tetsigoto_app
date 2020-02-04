require 'test_helper'

class ReminderMailerTest < ActionMailer::TestCase
  test "reminder_mail" do
    mail = ReminderMailer.reminder_mail
    assert_equal "Reminder mail", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "password_mail" do
    mail = ReminderMailer.password_mail
    assert_equal "Password mail", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
