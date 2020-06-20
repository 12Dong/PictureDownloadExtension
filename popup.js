  let changeColor = document.getElementById('changeColor');  
  let active = false;

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });


// const command = `
// 	let imgs = document.getElementsByClassName('sc-jRYQbI fowvZz');
// 	alert(imgs.length);
// 	let array = new Array();
// 	for(let i = 0;i < imgs.length; i++){
// 		if(i==0) alert(imgs[i].src);
// 		array[i] = imgs[i].src;
// 	}
// 	array;
// `;


const command = `
	let imageParent = document.getElementsByClassName('img-wrap-inner');
	let array = new Array();
	for(let i=0;i<imageParent.length;i++){
	    array[i]=imageParent[0].querySelector('img').src;
	}
	array;
`;


changeColor.onclick = function(element) {
 	chrome.tabs.executeScript(
 		{
 			code : command
 		},
 		function(result){
 			let images = result[0];
 			alert(images); 
 			for(let i =0;i<images.length;i++){
 				alert(images[i]);
 				ImgtodataURL(images[i], i, "png");
 			}
 		});
  };  


function ImgtodataURL(url, filename, fileType) {
    getBase64(url, fileType, (_baseUrl) => {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 图片转base64地址
    eleLink.href = _baseUrl;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
	});
}
            
function getBase64(url, fileType, callback) {
    //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片
    var Img = new Image(),
    dataURL = '';
    Img.src = url;
    Img.crossOrigin="*";
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
        width = Img.width, //确保canvas的尺寸和图片一样
        height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/' + fileType); //转换图片为dataURL
        callback ? callback(dataURL) : null;
    };
}

