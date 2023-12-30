class Api::PostsController < ApplicationController
  before_action :set_post, only: [:show]
  before_action :authenticate_user!, except: [:index, :show]
  before_action :correct_user, only: [:update, :destroy]  
  
  # GET /posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/:id
  def show
    # @post = Post.find(params[:id])
    render json: @post
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/:id
  def update
    # @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/:id
  def destroy
    # @post = Post.find(params[:id])
    if @post.destroy
      render json: { message: 'Post successfully deleted.' }, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def correct_user
    @post = current_user.posts.find_by(id: params[:id])
    render json: { error: "Not Authorized", user: current_user }, status: :forbidden unless @post
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
