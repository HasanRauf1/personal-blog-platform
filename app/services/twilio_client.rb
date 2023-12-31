class TwilioClient
  def initialize
    @client = Twilio::REST::Client.new(
      Rails.application.credentials.twilio[:account_sid],
      Rails.application.credentials.twilio[:account_token]
    )
  end

  def send_sms(to:, body:)
    @client.messages.create(
      from: '+18669741155',
      to: to,
      body: body
    )
  end
end
