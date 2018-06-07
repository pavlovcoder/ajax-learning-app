<?php 
  $q = intval($_GET['q']);

  $con = mysqli_connect('localhost', 'root', 'pTYw1WGbZyMCEQx6', 'american-citizen-database');

  if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
  }

?>