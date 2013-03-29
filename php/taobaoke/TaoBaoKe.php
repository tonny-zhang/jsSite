<?php 

class Helper_TaoBaoKe
{
	static $cfg = array(
		1 => array('key' => '12145346', 'pass' => 'c91304577b06fc944599899a0761d418', 'name' => '翻东西_2010'),
		2 => array('key' => '12597121', 'pass' => 'c376a58a706b0d290a507b1bb05feace', 'name' => '独立体'),
		);

	function Get($url, $account = 2, $outerCode ='', $ip = '') {
		$id = self::GetId($url);
		if (!$id) return false;
		
		if(!isset(self::$cfg[$account])) $account = 2;
		$paramArr = array( 
			'app_key' => self::$cfg[$account]['key'],
			'method' => 'taobao.taobaoke.items.detail.get',
			'format' => 'json',
			'v' => '2.0',
			'timestamp' => date( 'Y-m-d H:i:s' ),
			'fields' => 'title,price,click_url,coupon_rate,coupon_price,commission,commission_rate,commission_num,commission_volume',
			'num_iids' => $id,
			'nick' => self::$cfg[$account]['name'],
		);
		if($outerCode) $paramArr['outer_code'] = $outerCode;

		$sign = self::CreateSign($paramArr, $account);
		$strParam = self::CreateStrParam($paramArr);
		$strParam .= 'sign=' . $sign;

		$ch = curl_init();
		$timeout = 5; 
		if(!$ip) {
			curl_setopt ($ch, CURLOPT_URL, 'http://gw.api.taobao.com/router/rest?' . $strParam);
		} else {
			curl_setopt ($ch, CURLOPT_URL, "http://$ip/router/rest?" . $strParam);
			//下面这句话好像没有作用。
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Host:gw.api.taobao.com"));
		}
		
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$result = curl_exec($ch);
		//var_dump(curl_errno($ch), curl_getinfo($ch),$result);
		curl_close($ch);

		$result = json_decode( $result, true );
var_dump($result);
		$cilckUrl = $result['taobaoke_items_detail_get_response']['taobaoke_item_details']['taobaoke_item_detail'][0]['click_url'];

		if ( $cilckUrl )
			return $cilckUrl;

		return false;
	}

	function GetId( $url ) {
		$url = strtolower( $url );

		if ( str_replace( array( 'taobao.com', 'tmall.com' ), '', $url ) != $url ) {
			if ( preg_match( '/id=([%0-9]+)/is', $url, $re ) ) {
				if ( $re[1] > 0 ) return urldecode( $re[1] );
			}
		}
		return false;
	}
	
	function GetSearchUrl($keyword, $account = 1, $outerCode = ''){
		if(!isset(self::$cfg[$account])) $account = 1;
		$paramArr = array( 
			'app_key' => self::$cfg[$account]['key'],
			'method' => 'taobao.taobaoke.listurl.get',
			'format' => 'json',
			'v' => '2.0',
			'timestamp' => date( 'Y-m-d H:i:s' ),
			'q' => $keyword,
			'nick' => self::$cfg[$account]['name'],
		);
		if($outerCode) $paramArr['outer_code'] = $outerCode;

		$sign = self::CreateSign($paramArr, $account);
		$strParam = self::CreateStrParam($paramArr);
		$strParam .= 'sign=' . $sign;
		$url = 'http://gw.api.taobao.com/router/rest?' . $strParam;

		$ch = curl_init();
		$timeout = 5; 
		curl_setopt ($ch, CURLOPT_URL, $url);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$result = curl_exec($ch);
		curl_close($ch);

		$result = json_decode( $result, true );
		//var_dump($result);exit;

		$searchUrl = $result['taobaoke_listurl_get_response']['taobaoke_item']['keyword_click_url'];
		if ($searchUrl) return $searchUrl;
		return false;
	}

	protected function CreateSign($paramArr, $account = 1) {
		$sign = self::$cfg[$account]['pass'];
		ksort( $paramArr );
		foreach ( $paramArr as $key => $val ) {
			if ( $key != '' && $val != '' ) {
				$sign .= $key . $val;
			}
		}
		$sign = strtoupper( md5( $sign ) );
		return $sign;
	}

	protected function createStrParam($paramArr)	{
		$strParam = '';
		foreach ( $paramArr as $key => $val ) {
			if ( $key != '' && $val != '' ) {
				$strParam .= $key . '=' . urlencode( $val ) . '&';
			}
		}
		return $strParam;
	}
}