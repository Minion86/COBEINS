<?php

$code = 2;
$msg;
$details='';
$data;
$resp='';
$data = $_POST;

if (isset($data['nombre']) && !empty($data['nombre']) &&
        isset($data['mail']) && !empty($data['mail']) &&
        isset($data['whatsapp']) && !empty($data['whatsapp'])) {
    $nombre = $data['nombre'];
    $cedula = $data['mail'];
    $destino = "info@digytalscript.com , digitalscriptquito@gmail.com";
    $desde = "From:" . $nombre;
    $asunto = "Requiero Información de sus servicios";
    $mensaje = "Hola, soy " . $data['nombre'] . " ,me podrían ayudar con información sobre " . $data['mensaje'] . "? Mi número de whatsapp es " . $data['whatsapp'];
    mail($destino, $asunto, $mensaje, $desde);
    $code = 1;
    $msg = 'OK';
    //header("location:graciaspwd.php");
} else {
    $msg = "Problemas al enviar";
}

$resp = array('code' => $code, 'msg' => $msg, 'details' => $details);
echo json_encode($resp);
?>