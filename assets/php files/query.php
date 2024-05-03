<?php

include "./databasefile.php";
        $sql = "SELECT * FROM mybets;";

            $number = 0;

            $result = mysqli_query($conn, $sql) or die(mysqli_error());

            $records = []; 

            if(mysqli_num_rows($result) > 0){
                while($record = mysqli_fetch_assoc($result)){
                    $records[] = $record;
                    $number++;
                }
                

                header("Content-Type: application/json;charset=utf-8");

                echo json_encode($records);
            }
?>