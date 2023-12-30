# Clear existing posts
Post.delete_all

# Create sample posts
Post.create([
  {
    title: "Exploring the Beauty of the Great Outdoors",
    body: "There's nothing quite like the experience of hiking through a forest, the sound of leaves crunching underfoot and the fresh scent of pine in the air. In this post, we'll explore some of the most breathtaking national parks and what makes them unique. From the serene lakes to majestic mountains, join us on a journey through nature's wonders.",
    user_id: 1
  },
  {
    title: "The Future of Technology and Innovation",
    body: "As we move further into the 21st century, technology continues to evolve at a rapid pace. This post delves into upcoming technological advancements that are set to change our lives. We'll look at everything from artificial intelligence and robotics to sustainable energy solutions. Get ready to discover how the future is shaping up to be more interconnected and innovative than ever before.",
    user_id: 1
  },
  {
    title: "Culinary Delights: Exploring World Cuisines",
    body: "Food is not just about sustenance; it's a journey of flavors, culture, and traditions. In this post, we'll take a culinary tour around the world, exploring exotic dishes from various countries. Whether it's the spicy curries of India, the rich pastas of Italy, or the sushi of Japan, there's a whole world of flavors waiting to be explored.",
    user_id: 1
  },
  {
    title: "Mindfulness and Mental Health",
    body: "In our busy lives, it's crucial to take a moment to breathe and be present. This post focuses on the importance of mindfulness and its impact on mental health. We'll discuss techniques like meditation and yoga, and how incorporating these practices into your daily routine can lead to a more balanced and fulfilling life.",
    user_id: 1
  },
  {
    title: "The Art of Photography: Capturing Moments",
    body: "Photography is more than just taking pictures; it's about capturing moments and the essence of a place or person. In this post, we'll explore the art of photography, from the basics of composition and lighting to advanced techniques for creating stunning images. Whether you're a beginner or a seasoned photographer, there's always something new to learn in the world of photography.",
    user_id: 1
  }
])
