var s = document.getElementById("s");
			s.style.top = "0";
			s.style.left = "0";
document.onkeydown = function(e) {
  /* 方塊移動的速度，即每按一次方塊移動的畫素，值越大移動速度越快 */
  var speed = 20;
  switch(e.which){
    // 上
    case 38:
      s.style.top = parseInt(s.style.top) - speed + "px";
      break;
    // 下
    case 40:
      s.style.top = parseInt(s.style.top) + speed + "px";
      break;
    // 左
    case 37:
      s.style.left = parseInt(s.style.left) - speed + "px";
      break;
    // 右
    case 39:
      s.style.left = parseInt(s.style.left) + speed + "px";
      break;
  }
}	
var aa=14;
    var chess = document.getElementById("mycanvas");
    var context = chess.getContext('2d');
    var tree = [];//存放是否聯通
    var isling=[];//判斷是否相連
    for(var i=0;i<aa;i++){
        tree[i]=[];
        for(var j=0;j<aa;j++){
            tree[i][j]=-1;//初始值為0
        }
    }  for(var i=0;i<aa*aa;i++){
        isling[i]=[];
        for(var j=0;j<aa*aa;j++){
            isling[i][j]=-1;//初始值為0
        }
    }
    function drawChessBoard(){//繪畫
      for(var i=0;i<aa+1;i++){
          context.strokeStyle='gray';//可選區域
          context.moveTo(15+i*30,15);//垂直方向畫15根線，相距30px;
          context.lineTo(15+i*30,15+30*aa);
          context.stroke();
          context.moveTo(15,15+i*30);//水平方向畫15根線，相距30px;棋盤為14*14；
          context.lineTo(15+30*aa,15+i*30);
          context.stroke();
      }
  }
    drawChessBoard();//繪製棋盤
   
         var mymap=new Array(36);
          for(var i=0;i<36;i++)
         {mymap[i]=-1;}
 
    function getnei(a)//獲得鄰居號  random
    {
        var x=parseInt(a/aa);//要精確成整數
        var y=a%aa;
        var mynei=new Array();//儲存鄰居
        if(x-1>=0){mynei.push((x-1)*aa+y);}//上節點
        if(x+1<14){mynei.push((x+1)*aa+y);}//下節點
        if(y+1<14){mynei.push(x*aa+y+1);}//有節點
        if(y-1>=0){mynei.push(x*aa+y-1);}//下節點
        var ran=parseInt(Math.random() * mynei.length );
        return mynei[ran];

    }
    function search(a)//找到根節點
    {
        if(tree[parseInt(a/aa)][a%aa]>0)//說明是子節點
        {
            return search(tree[parseInt(a/aa)][a%aa]);//不能壓縮路徑路徑壓縮
        }
        else
            return a;
    }
    function value(a)//找到樹的大小
    {
        if(tree[parseInt(a/aa)][a%aa]>0)//說明是子節點
        {
            return tree[parseInt(a/aa)][a%aa]=value(tree[parseInt(a/aa)][a%aa]);//不能路徑壓縮
        }
        else
            return -tree[parseInt(a/aa)][a%aa];
    }
    function union(a,b)//合併
    {
        var a1=search(a);//a根
        var b1=search(b);//b根
        if(a1==b1){}
        else
        {
            if(tree[parseInt(a1/aa)][a1%aa]<tree[parseInt(b1/aa)][b1%aa])//這個是負數()，為了簡單減少計算，不在呼叫value函式
            {
                tree[parseInt(a1/aa)][a1%aa]+=tree[parseInt(b1/aa)][b1%aa];//個數相加  注意是負數相加
                tree[parseInt(b1/aa)][b1%aa]=a1;       //b樹成為a樹的子樹，b的根b1直接指向a；
            }
            else
            {
                tree[parseInt(b1/aa)][b1%aa]+=tree[parseInt(a1/aa)][a1%aa];
                tree[parseInt(a1/aa)][a1%aa]=b1;//a所在樹成為b所在樹的子樹
            }
        }
    }

    function drawline(a,b)//劃線，要判斷是上下還是左右
    {

        var x1=parseInt(a/aa);
        var y1=a%aa;
        var x2=parseInt(b/aa);
        var y2=b%aa;        
        var x3=(x1+x2)/2;
        var y3=(y1+y2)/2;
        if(x1-x2==1||x1-x2==-1)//左右方向的點  需要上下劃線
        {
            //alert(x1);
            //  context.beginPath();
            context.strokeStyle = 'white';
            //    context.moveTo(30+x3*30,y3*30+15);//
            //   context.lineTo(30+x3*30,y3*30+45);
            context.clearRect(29+x3*30, y3*30+16,2,28);
            //    context.stroke();
        }
        else
        {
            //   context.beginPath();
            context.strokeStyle = 'white';
            //  context.moveTo(x3*30+15,30+y3*30);//
            //    context.lineTo(45+x3*30,30+y3*30);
            context.clearRect(x3*30+16, 29+y3*30,28,2);
            //      context.stroke();
        }
    }
     
    while(search(0)!=search(aa*aa-1))//主要思路
    {
        var num = parseInt(Math.random() * aa*aa );//產生一個小於196的隨機數
        var neihbour=getnei(num);
        if(search(num)==search(neihbour)){continue;}
        else//不在一個上
        {
           isling[num][neihbour]=1;isling[neihbour][num]=1;
            drawline(num,neihbour);//劃線
            union(num,neihbour);
         
        }
    }
    

   




