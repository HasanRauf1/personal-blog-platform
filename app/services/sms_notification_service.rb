class SmsNotificationService
  def initialize(notification_type, record_id)
    @notification_type = notification_type
    @record_id = record_id
  end

  def call
    case @notification_type
    when 'post'
      send_post_notification
    when 'comment'
      send_comment_notification
    else
      raise "Unknown notification type: #{@notification_type}"
    end
  end

  private

  def send_post_notification
    post = Post.find(@record_id)
    # Fetch users subscribed to all new posts
    general_subscribers = User.joins(:general_subscription)
                              .where(general_subscriptions: { subscribe_to_new_posts: true })

    # Fetch users subscribed to this specific author
    specific_subscribers = User.joins(:specific_subscriptions)
                               .where(specific_subscriptions: { subscribable: post.user })

    # Combine the two sets of users and remove duplicates
    subscribers = (general_subscribers + specific_subscribers).uniq

    SendSmsJob.perform_later(subscribers, post)
  
  end

  def send_comment_notification
    comment = Comment.find(@record_id)
    post = comment.post

    # Fetch users subscribed to all new comments
    general_subscribers = User.joins(:general_subscription)
                              .where(general_subscriptions: { subscribe_to_all_comments: true })

    # Fetch users subscribed to comments on their own posts
    own_post_subscribers = User.joins(:general_subscription)
                               .where(general_subscriptions: { subscribe_to_own_post_comments: true }, id: post.user_id)

    # Fetch users subscribed specifically to this post
    specific_post_subscribers = User.joins(:specific_subscriptions)
                                    .where(specific_subscriptions: { subscribable: post })

    # Combine the sets of users and remove duplicates
    subscribers = (general_subscribers + own_post_subscribers + specific_post_subscribers).uniq

    SendSmsJob.perform_later(subscribers, comment)
  end
end
