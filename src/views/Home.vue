<template>
  <div class="container mt-5">
    <!-- ヘッダー -->
    <header class="mb-4 text-center">
      <h1>Welcome to Home Page</h1>
      <p class="lead">This is a sample homepage built with Vue and Bootstrap</p>
    </header>

    <!-- カードのセクション -->
    <div class="row">
      <!-- 1つ目のカード -->
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100">
          <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Sample Image 1">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Card Title 1</h5>
            <p class="card-text flex-grow-1">This is a sample card with some quick example text to build on the card title.</p>
            <a href="#" class="btn btn-primary mt-auto">Go somewhere</a>
          </div>
        </div>
      </div>

      <!-- 2つ目のカード -->
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100">
          <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Sample Image 2">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Card Title 2</h5>
            <p class="card-text flex-grow-1">Another sample card with example text for description.</p>
            <a href="#" class="btn btn-primary mt-auto">Learn more</a>
          </div>
        </div>
      </div>

      <!-- 3つ目のカード -->
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100">
          <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Sample Image 3">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Card Title 3</h5>
            <p class="card-text flex-grow-1">This card contains additional information and links to relevant content.</p>
            <a href="#" class="btn btn-primary mt-auto">Discover more</a>
          </div>
        </div>
      </div>
    </div>

    <!-- フッター -->
    <footer class="text-center mt-4">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eaeaea;
  color: #6c757d;
}
</style>
