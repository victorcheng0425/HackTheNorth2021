<?php
session_start();
?>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="bootstrap-5.0.1-dist/css/bootstrap-grid.min.css" rel="stylesheet">
    <link href="bootstrap-5.0.1-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
    <title>Price Checker</title>
</head>
<body class="s-body">
    <?php
        $input = null;
        if(isset($_SESSION['input'])) {
            $input = $_SESSION['input'];
        }
    ?>
    <div class="container-fluid search-container">
        <div class="row image_row">
            <img class="title_image" src="images/title_picture.png" >
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-md-8">
                <form action="result.php" method="post" id = "search_form">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="mb-3">

    <!--                                <label for="searchInput" class="form-label">Item Name</label>-->
                                    <input name="search_key" type="text" class="form-control" id="searchInput" aria-describedby="message" placeholder="Item Name">
                                    <div id="message" class="form-text">We'll search all the website for you.</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col"></div>
        </div>
        <?php
            $pageNum = 0;
            if(!isset($_GET['page'])) {
                $pageNum = 1;
            } else {
                $pageNum = $_GET['page'];
            }
        ?>
        <div class="row">
            <div class="col"></div>
            <div class="col-md-10">
                <?php
                if($input != null){
                    for($n=6*($pageNum-1); $n < 6*$pageNum && $n < count($input); $n++):
                        $product = $input[$n];


                // foreach ($input as $product): ?>
                    <div class="row product_entry">
                        <div class="col-md-4 image_col">
                            <a href= "<?=$product['image'];?>" >
                                <img src="<?=$product['image'];?>" style="width: 200px; padding:15px; border-radius: 20px;">

                            </a>
                        </div>

                        <div class="col-md-4 name_col">
                            <a href= "https://www.google.com" >
                                <span> <?=$product['title']?> </span>
                            </a>
                        </div>
                        <div class="col-md-4 price_col">
                            <span> &dollar;<?=$product['price']?> </span>
                        </div>
                    </div>
                            
                <?php endfor; }?>


                    
                
            </div>
            <div class="col"></div>

        </div>

        <div class="row">
            <div class="col"></div>
            <div class="col-md-3 page-nav">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <?php
                            if($input != null) {
                                for ($n = 1; $n <= ceil(count($input) / 6.0); $n++) {
                                    echo "<li class=\"page-item\"><a class=\"page-link\" href=\"index.php?page=$n\">$n</a></li>";
                                }
                            }
                        ?>
                        <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col"></div>
        </div>

    </div>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="bootstrap-5.0.1-dist/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="ebay.js"></script>  TODO -->
<script type="text/javascript" src="script.js"></script>

</body>
</html>
