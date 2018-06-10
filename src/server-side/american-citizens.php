<?php 
  function OpenCon() {
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = 'pTYw1WGbZyMCEQx6';
    $db = 'american-citizens-database';

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die('Connect failed: %s\n'. $conn -> error);

    return $conn;
  }

  function CloseCon($conn) {
    {
      $conn -> close();
    }
  }

  $q = intval($_GET['q']);
  $con = OpenCon();
  $sql = "SELECT * FROM citizens WHERE id = '".$q."'";
  $result = mysqli_query($con, $sql);

  echo "<table>
  <tr>
  <th>Firstname</th>
  <th>Lastname</th>
  <th>Age</th>
  <th>Hometown</th>
  <th>Job</th>
  </tr>";
  while($row = mysqli_fetch_array($result)) {
      echo "<tr>";
      echo "<td>" . $row['firstname'] . "</td>";
      echo "<td>" . $row['lastname'] . "</td>";
      echo "<td>" . $row['age'] . "</td>";
      echo "<td>" . $row['hometown'] . "</td>";
      echo "<td>" . $row['job'] . "</td>";
      echo "</tr>";
  }
  echo "</table>";

  CloseCon($con);
?>