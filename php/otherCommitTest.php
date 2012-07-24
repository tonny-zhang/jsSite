<?php
class Test{
	static private function makeQueryString($params)
	{
		if (is_string($params))
			return $params;
			
		$query_string = array();
	    foreach ($params as $key => $value)
	    {   
	        array_push($query_string, rawurlencode($key) . '=' . rawurlencode($value));
	    }   
	    $query_string = join('&', $query_string);
	    return $query_string;
	}

	static private function makeCookieString($params)
	{
		if (is_string($params))
			return $params;
			
		$cookie_string = array();
	    foreach ($params as $key => $value)
	    {   
	        array_push($cookie_string, $key . '=' . $value);
	    }   
	    $cookie_string = join('; ', $cookie_string);
	    return $cookie_string;
	}
	static function makeRequest($url, $params, $cookie, $method='post', $protocol='http')
	{   
		$query_string = self::makeQueryString($params);	   
	    $cookie_string = self::makeCookieString($cookie);
	    	    
	    $ch = curl_init();

	    if ('get' == $method)
	    {
		    curl_setopt($ch, CURLOPT_URL, "$url?$query_string");
	    }
	    else 
        {
		    curl_setopt($ch, CURLOPT_URL, $url);
		    curl_setopt($ch, CURLOPT_POST, 1);
		    curl_setopt($ch, CURLOPT_POSTFIELDS, $query_string);
	    }
        
	    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, "fan:lizi");
		
	    curl_setopt($ch, CURLOPT_HEADER, false);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);

        // disable 100-continue
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:'));

	    if (!empty($cookie_string))
	    {
	    	curl_setopt($ch, CURLOPT_COOKIE, $cookie_string);
	    }
	    
	    if ('https' == $protocol)
	    {
	    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	    }
		curl_setopt($ch, CURLOPT_AUTOREFERER, 1); // 自动设置Referer 
		//curl_setopt($ch, CURLOPT_REFERER , 'http://'.$_SERVER['HTTP_HOST'].'/'.$_SERVER['REQUEST_URI']);
		$ip = $_SERVER['REMOTE_ADDR'];
		curl_setopt($ch,CURLOPT_HTTPHEADER,array('REMOTE_ADDR: 10.10.10.10')); 
		curl_setopt($ch,CURLOPT_HTTPHEADER,array('CLIENT_IP: 10.10.10.01'));

	    $ret = curl_exec($ch);
	    $err = curl_error($ch);
	    
	    if (false === $ret || !empty($err))
	    {
		    $errno = curl_errno($ch);
		    $info = curl_getinfo($ch);
		    curl_close($ch);

	        return array(
	        	'result' => false,
	        	'errno' => $errno,
	            'msg' => $err,
	        	'info' => $info,
	        );
	    }
	    
       	curl_close($ch);

        return array(
        	'result' => true,
            'msg' => $ret,
        );
	            
	}
}
$result = Test::makeRequest('http://js.zk.com/php/otherCommit.php','test=123','');
var_dump($result);
?>