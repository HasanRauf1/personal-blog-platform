class SendSmsJob < ApplicationJob
  queue_as :default

  def perform(post_id, comment_id)
    post = Post.find(post_id)
    comment = Comment.find(comment_id)
    user = comment.user
    post_author = post.user

    if post_author.phone_number.present?
      sms_body = "New comment on your post '#{post.title}' by #{user.name}: #{comment.content}"

      TwilioClient.new.send_sms(
        to: post_author.phone_number, 
        body: sms_body
      )
    end
  end
end
