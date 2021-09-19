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
<!--            <a href="index.php" >-->
                <img class="title_image" src="images/title_picture.png" >
<!--            </a>-->
        </div>

        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-muted"> Price Checker</p>

                <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img width="60" height="70" src="../images/p.png" />
                </a>

                <ul class="nav col-md-4 justify-content-end">
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
                </ul>
            </footer>
        </div>

        <form action="result.php" method="post" id = "search_form">
        <div class="row radio">
            <div class="col-md-3"></div>
            <div class="col-md-2">

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sortRadio" value="el" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        None
                    </label>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sortRadio" value = "as" id="flexRadioDefault2" >
                    <label class="form-check-label" for="flexRadioDefault2">
                        Low-High
                    </label>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sortRadio" value = "de" id="flexRadioDefault3">
                    <label class="form-check-label" for="flexRadioDefault3">
                        High-low
                    </label>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>

        <div class="row search_row">
            <div class="col"></div>
            <div class="col-md-8">

                    <div class="row">
                        <div class="col"></div>
                        <div class="col-md-8">
                            <div class="mb-4">
                                    <input name="search_key" type="text" class="form-control" id="searchInput" aria-describedby="message" placeholder="Item Name">
                                    <div id="message" class="form-text">We'll search all the website for you.</div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary">Search</button>
                        </div>
                    </div>
            </div>
            <div class="col"></div>
        </div>
        </form>
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
                if($input != null && isset($_GET['hascontent'])){
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
                            <a href= "<?=$product['link'];?>" target="_blank">
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
            <div class="pageNum"><?php echo $pageNum ?></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-md-3 page-nav">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="<?php
                            $nextPage = $pageNum - 1;
                            if ($nextPage <= 0) {
                                $nextPage = 1;
                            }
                            echo "index.php?hascontent=1&page=$nextPage"
                            ?>" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <?php
                            if($input != null && isset($_GET['hascontent'])){
                                for ($n = 1; $n <= ceil(count($input) / 6.0); $n++) {
                                    echo "<li class=\"page-item\"><a class=\"page-link\" href=\"index.php?hascontent=1&page=$n\">$n</a></li>";
                                }
                            }
                        ?>
                        <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                        <li class="page-item">
                            <a class="page-link" href="<?php
                            $nextPage = $pageNum + 1;
                            if ($nextPage > ceil(count($input)/6.0)) {
                                $nextPage = ceil(count($input)/6.0);
                            }
                            echo "index.php?hascontent=1&page=$nextPage"
                            ?>" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col"></div>

        </div>


        <div class="container">
            <footer class="row row-cols-5 py-5 my-5 border-top">
                <div class="col">
                    <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">

                        <img width="60" height="70" src="images/p.png" />
                    </a>
                    <p class="text-muted"> PC2021</p>
                </div>

                <div class="col">

                </div>

                <div class="col">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>
            </footer>
        </div>

        <div class="b-example-divider"></div>


        <div class="container">
            <footer class="py-5">
                <div class="row">
                    <div class="col-2">
                        <h5>Section</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                        </ul>
                    </div>

                    <div class="col-2">
                        <h5>Section</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                        </ul>
                    </div>

                    <div class="col-2">
                        <h5>Section</h5>
                        <ul class="nav flex-column">
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                        </ul>
                    </div>

                    <div class="col-4 offset-1">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of whats new and exciting from us.</p>
                            <div class="d-flex w-100 gap-2">
                                <label for="newsletter1" class="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
                                <button class="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="d-flex justify-content-between py-4 my-4 border-top">
                    <p> Price Checker All rights reserved.</p>
                    <ul class="list-unstyled d-flex">
                        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
                        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
                        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
                    </ul>
                </div>
            </footer>

    </div>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="bootstrap-5.0.1-dist/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="ebay.js"></script>  TODO -->
<!--<script type="text/javascript" src="script.js"></script>-->

</body>
</html>
