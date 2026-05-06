<?php
// Basic Auth en PHP - sans dependance au chemin absolu OVH
// Le mot de passe est stocke sous forme de hash bcrypt (PASSWORD_BCRYPT)
// genere avec password_hash() ; on verifie via password_verify() en temps constant.
// Sur OVH mutualise (PHP-CGI/FastCGI), PHP_AUTH_USER n'est pas auto-peuple :
// on reconstruit a partir de HTTP_AUTHORIZATION (passe via .htaccess RewriteRule).
$VALID_USER = 'sarah';
$VALID_PASS_HASH = '$2b$10$Pod.iAAme1uD6DE/UEgNOOLb9GegdCjAcUiXh9oXyiGEsvJ.mPTku';

if (!isset($_SERVER['PHP_AUTH_USER'])) {
    $auth_header = null;
    foreach (['HTTP_AUTHORIZATION', 'REDIRECT_HTTP_AUTHORIZATION', 'REDIRECT_REDIRECT_HTTP_AUTHORIZATION'] as $k) {
        if (!empty($_SERVER[$k])) { $auth_header = $_SERVER[$k]; break; }
    }
    if ($auth_header && stripos($auth_header, 'Basic ') === 0) {
        $decoded = base64_decode(substr($auth_header, 6));
        if ($decoded !== false && strpos($decoded, ':') !== false) {
            [$u, $p] = explode(':', $decoded, 2);
            $_SERVER['PHP_AUTH_USER'] = $u;
            $_SERVER['PHP_AUTH_PW'] = $p;
        }
    }
}

if (!isset($_SERVER['PHP_AUTH_USER'])
    || $_SERVER['PHP_AUTH_USER'] !== $VALID_USER
    || !isset($_SERVER['PHP_AUTH_PW'])
    || !password_verify($_SERVER['PHP_AUTH_PW'], $VALID_PASS_HASH)) {
    header('WWW-Authenticate: Basic realm="Acces restreint - Demo MKZ"');
    header('HTTP/1.0 401 Unauthorized');
    header('X-Robots-Tag: noindex, nofollow');
    echo '<!doctype html><html lang="fr"><meta charset="utf-8"><title>401</title><body style="font-family:sans-serif;padding:2rem"><h1>Authentification requise</h1><p>Cette page est protegee.</p></body></html>';
    exit;
}

header('X-Robots-Tag: noindex, nofollow');
header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/_content.html');
