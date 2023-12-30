class Api::CommentsController < ApplicationController
  before_action :set_post

  def index
    @comments = @post.comments.includes(:user)
    render json: @comments, include: :user
  end

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: @comment, include: :user, status: :created, location: @api_post
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
