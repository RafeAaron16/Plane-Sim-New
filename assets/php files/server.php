<?php



    include "./databasefile.php";

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: *");

        $json = file_get_contents('php://input');

        $data = json_decode($json);      

    $centertext = "Get Ready For Flight\n\n";

    if (isset($data->intention) and isset($data->username)){

        if($data->intention == "get amount remaining"){

            $sql = "SELECT AMOUNT FROM user where Name = '".$data->username ."';";

            $result = mysqli_query($conn, $sql) or die(mysqli_error());

            if(mysqli_num_rows($result) > 0){
                $record = mysqli_fetch_assoc($result);
                $my_Cash = '{amount: '.$record["AMOUNT"].'}';

                header("Content-Type: application/json;charset=utf-8");

                echo "".$record["AMOUNT"];
            }
        }

        if($data->intention == "get state"){

            echo $centertext;
        }


        if($data->intention == "place bet"){

            $sql = "INSERT INTO mybets values('".$data->username."', ".$data->betAmount.");";

            $result = mysqli_query($conn, $sql) or die(mysqli_error());

            $sql2 = "INSERT INTO currentbets values('".$data->username."', ".$data->betAmount.");";

            $result2 = mysqli_query($conn, $sql2) or die(mysqli_error());

            if($result){

                if($result2){
                echo "Success";
                }
            }
                
            else{
                echo "Failure";        
            }
            }
        }

        if($data->intention == "reduce amount remaining"){

            $sql1 = "SELECT AMOUNT FROM user where Name = '".$data->username ."';";

            $result1 = mysqli_query($conn, $sql1) or die(mysqli_error());

            if(mysqli_num_rows($result1) > 0){
                $record = mysqli_fetch_assoc($result1);
            }

            $sql = "UPDATE user SET AMOUNT = ".$record["AMOUNT"] - $data->betAmount." where Name = '".$data->username ."';";

            $result = mysqli_query($conn, $sql);

            if($result === TRUE){
                echo "Success";
            }else{
                echo "Failure";
            }            
        }

        if($data->intention == "add to amount remaining"){

            $sql1 = "SELECT AMOUNT FROM user where Name = '".$data->username ."';";

            $result1 = mysqli_query($conn, $sql1) or die(mysqli_error());

            if(mysqli_num_rows($result1) > 0){
                $record = mysqli_fetch_assoc($result1);
            }

            $sql = "UPDATE user SET AMOUNT = ".$data->AmountToAdd." where Name = '".$data->username ."';";

            $result = mysqli_query($conn, $sql) or die(mysqli_error());

            if($result == TRUE){
                echo "Success";
            }else{
                echo "Failure";
            }

            
        }

    

    if($data->intention == "retrieve current bets"){

        $sql = "SELECT * FROM currentbets;";

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

        else{
            echo json_encode(["message", "No bets present"]);
        }
    }

    if($data->intention == "retrieve my current bets"){

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

        else{
            echo json_encode(["message", "No bets present"]);
        }
    }

    if($data->intention == "start again"){

        $sql = "DELETE FROM currentbets;";

        $result = mysqli_query($conn, $sql) or die(mysqli_error());

        if($result == true){
            echo "Success";
        }else{
            echo "Failure";
        }
    }

    if($data->intention == "add user to database"){

        $sql1 = "SELECT * FROM user WHERE Name ='". $data->username ."';";

        $result1 = mysqli_query($conn, $sql1) or die(mysqli_error());

        if(mysqli_num_rows($result1) > 0){
            echo "Failure1";
        }else{

        $sql = "INSERT INTO user(Name, AMOUNT) values('".$data->username ."', ". $data->amount .")";

        $result = mysqli_query($conn, $sql) or die(mysqli_error());

        if($result == true){
            echo "Success";
        }else{
            echo "Failure";
        }
    }
}

    
?>
