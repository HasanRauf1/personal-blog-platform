class SendSmsJob < ApplicationJob
  queue_as :default

  def perform(subscribers, record)
    
    subscribers.each do |subscriber|
      message_body = if record.is_a?(Post)
        "Hi, #{subscriber.name} New post: #{record.title}"
      elsif record.is_a?(Comment)
        "Hi, #{subscriber.name} New comment on #{record.post.title}: #{record.content}"
      end

      TwilioClient.new.send_sms(to: subscriber.phone_number, body: message_body)
    end
  end
end
