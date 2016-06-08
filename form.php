<?php
	$fields = array(
		'name'       => 'Имя',
		'email'    	 => 'E-mail',
		'phone'      => 'Телефон',
		'theme'      => 'Тема',
		'time'       => 'Во сколько позвонить',
	);
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$body = 'Сайт: Баня-бочка';

		foreach ($_POST as $key => $value) {
			if ($key == 'theme') {
				$theme = $value;
				if (!$value) {
					$value = 'Без темы';
				}
				$theme = $value;
			}
			$body .= "\n" . $fields[$key] . ': ' . $value;
		}

		$email_to = 'mnstrsound@gmail.com';
		$headers = 'Content-type: text; charset=UTF-8' . "\r\n";
		$headers .= 'From: bbanya.ru '. "\r\n" . '';
		$subject = $theme;
		mail($email_to, $subject, $body, $headers);
		echo "OK";
	} else {
		echo '';
	}
?>
