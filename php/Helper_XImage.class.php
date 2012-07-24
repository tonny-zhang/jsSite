<?php
/**
 * 图片处理助手，使用Imagick
 */

class Helper_XImage
{
    protected $_filename = null;

    function __construct($filename)
    {
        $this->_filename = $filename;
    }

    /**
     *压缩产品图片
     *@param string $destname 保存路径
     *@param int|array $size 压缩尺寸
     *@quality 压缩质量
     */
    function cropProductImage($destname,$size,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $width=$image->getImageWidth();
            $height=$image->getImageHeight();
            $length=$width>$height?$width:$height;
            $delta = 0;

            if($width>$height)
            {
                $delta=($width-$height)/2;
            }
            else
            {
                $delta=($height-$width)/2;
            }

            $bg= new Imagick();
            $bg->newImage($length,$length,'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);

            if($width>$height)
            {
                $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, $delta);
            }
            else
            {
                $bg->compositeImage($image, Imagick::COMPOSITE_OVER, $delta, 0);
            }

            $bg->thumbnailImage($size,$size);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    /**
     * 转换图片为JPEG格式
     */
    function convertToJPEG($destname,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            
            $bg= new Imagick();
            $bg->newImage($image->getImageWidth(),$image->getImageHeight(),'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    /**
     * 定宽裁剪图片
     */
    function cropImageFixWidth($destname,$width,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            if($image->getImageWidth()>$width)
            {
                $image->ThumbnailImage($width,0);
            }

            $width=$image->getImageWidth();
            $height=$image->getImageHeight();

            $bg= new Imagick();
            $bg->newImage($width,$height,'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    /**
     * 截取用户上传头像，大图
     */
    function cropUserImage($destname,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $width=$image->getImageWidth();
            $height=$image->getImageHeight();

            if($width<$height)
            {
                if($width>200)
                {
                    $image->ThumbnailImage(200,0);
                }
            }
            else
            {
                if($height>200)
                {
                    $image->ThumbnailImage(0,200);
                }
            }

            $bg= new Imagick();
            $bg->newImage($image->getImageWidth(),$image->getImageHeight(),'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);
            $size['width']=$bg->getImageWidth();
            $size['height']=$bg->getImageHeight();

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return $size;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    /**
     * 从大图截取用户icon
     */
    function cropUserIcon($destname,$quality,$size,$width,$height,$x1,$y1)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $image->cropImage($width,$height,$x1,$y1);
            $image->thumbnailImage($size,$size);
            $image->setImageFormat( "jpg" );
            $image->writeImage($destname);
            $image->clear();
            $image->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    function cropUserIconAuto($destname,$quality,$size)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $image->cropThumbnailImage($size,$size);
            $image->setImageFormat( "jpg" );
            $image->writeImage($destname);
            $image->clear();
            $image->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    function cropIcon($destname,$size,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $image->cropThumbnailImage($size,$size);
            
            $bg= new Imagick();
            $bg->newImage($size,$size,'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;  
        }
    }

    function thumbnailIcon($destname,$size,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $image->thumbnailImage($size,$size);

            $bg= new Imagick();
            $bg->newImage($size,$size,'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    function getImageWidth()
    {
        try
        {
            $image=new Imagick($this->_filename);
            $width = $image->getImageWidth();
            $image->clear();
            $image->destroy();
            return $width;
        }
        catch(Exception $e)
        {
            return 0;
        }
    }

    function getImageHeight()
    {
        try
        {
            $image=new Imagick($this->_filename);
            $height = $image->getImageHeight();
            $image->clear();
            $image->destroy();
            return $height;
        }
        catch(Exception $e)
        {
            return 0;
        }
    }

    function cropShowImageS1($destname,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $width=$image->getImageWidth();
            $height=$image->getImageHeight();

            if($width>$height)
            {
                if($width>=540)
                {
                    $image->ThumbnailImage(540,0);
                }
                else
                {
                    $image->ThumbnailImage($width,0);
                }
            }
            else
            {
                $image->ThumbnailImage(0,500);
            }
            $bg= new Imagick();
            $bg->newImage($image->getImageWidth(),$image->getImageHeight(),'white');
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, 0, 0);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    function cropIconFillBlank($destname,$size,$quality)
    {
        try
        {
            $image=new Imagick($this->_filename);
            $image->setImageCompression(Imagick::COMPRESSION_JPEG);
            $image->setImageCompressionQuality($quality);
            $width=$image->getImageWidth();
            $height=$image->getImageHeight();
            
            $newWidth=$width;
            $newHeight=$height;
            $startWidth=0;
            $startHeight=0;
            $minLength=$width<$height?$width:$height;
            
            if($minLength<$size) //最小边小于size
            {
                if($width>$height)
                {
                    $newHeight=$size;
                    $startHeight=($size-$height)/2;
                }
                else
                {
                    $newWidth=$size;
                    $startWidth=($size-$width)/2;
                }
            }
            
            $bg= new Imagick();
            $bg->newImage($newWidth,$newHeight,'white'); //生成背景图
            $bg->setImageCompression(Imagick::COMPRESSION_JPEG);
            $bg->setImageCompressionQuality($quality);
            $bg->compositeImage($image, Imagick::COMPOSITE_OVER, $startWidth, $startHeight); //图片叠加

            $bg->cropThumbnailImage($size,$size);
            $bg->setImageFormat("jpg");
            $bg->writeImage($destname);

            $image->clear();
            $image->destroy();
            $bg->clear();
            $bg->destroy();
            return true;
        }
        catch(Exception $e)
        {
            return false;
        }
    }
}phpinfo();
$image = new Helper_XImage('d:/1.jpg');
$list_160_160_image = 'd:/1_160_160.jpg';
if(!$image->cropProductImage($list_160_160_image,160,90)){
	echo "图片压缩出现异常";
	exit;
}
