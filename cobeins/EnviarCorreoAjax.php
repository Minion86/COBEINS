<?php

$code = 2;
$msg;
$details = $_POST;
$data;
$resp = '';
$data = $_POST;

if (isset($data['name']) && !empty($data['name']) &&
        isset($data['email']) && !empty($data['email']) &&
        isset($data['telefono']) && !empty($data['telefono']) &&
        isset($data['ciudad']) && !empty($data['ciudad']) &&
        isset($data['mensaje']) && !empty($data['mensaje'])
) {
    $nombre = $data['name'];
    $cedula = $data['email'];
    $destino = "info@cobeinsdetectivesprivados.com";
    $desde = "From:" . $nombre;
    $asunto = "Requiero Información de sus servicios";
    $mensaje = "Hola, mi nombre es " . $data['name'] . " , soy de la ciudad de " . $data['ciudad'] . ", me podrían ayudar por favor con información sobre " . $data['mensaje'] . "? Mi número de teléfono es " . $data['telefono'];
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