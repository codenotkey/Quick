$('.btn').on('click', ()=>{
   let add = 'https://www.baidu.com/s?wd='
   let wd = $('.search> input').val()
   window.screen.width<500?window.open(add+wd,'_self') : window.open(add+wd)
})
console.log(window.screen.width<500)
const simplifyUrl = (url) => {
   return url.replace('https://', '')
     .replace('http://', '')
     .replace('www.', '')
     .replace(/\/.*/, '') // 删除 / 开头的内容
 }


let temp =  localStorage.getItem('x')
let xObject = JSON.parse(temp)

let tabList =  xObject ||  [
   {
   tab_url: 'https://www.acfun.cn',
   tab_icon: 'https://www.acfun.cn/favicon.ico',
   tab_name: 'A'
   },
   {
      tab_url: 'https://www.bilibili.com',
      tab_icon: 'https://www.bilibili.com/favicon.ico',
      tab_name: 'B'
      },
      {
         tab_url: 'https://www.baidu.com',
         tab_icon: 'https://www.baidu.com/favicon.ico',
         tab_name: 'C'
         }  
]

let render_Tab = ()=>{
   $('.tab_list').find('div:not(.add_tab)').remove()
   tabList.forEach((node, index) =>{
      let tab =$(`
      <div class="tab">
         <div class="imgBg">
            <img src="${node.tab_icon}">
         </div>
         <div>${node.tab_name.toUpperCase()}</div>
      </div>`).insertBefore($('.add_tab'))
      tab.on({    
         touchstart: function(e) {   
             // 长按事件触发    
             timeOutEvent = setTimeout(function() {    
                 timeOutEvent = 0;    
                 tabList.splice(index,1)
                 render_Tab()
             }, 400);    
             //长按400毫秒     
             // e.preventDefault();      
         },    
         touchmove: function() {    
             clearTimeout(timeOutEvent);    
             timeOutEvent = 0;    
         },    
         touchend: function() {    
             clearTimeout(timeOutEvent);    
             if (timeOutEvent != 0) {    
                 window.open(node.tab_url,'_self')
             }    
             return false;    
         }    
      }) 
      tab.on('click', ()=>{
         window.open(node.tab_url)
      })
      tab.mousedown((e)=>{
         if(e.which === 3){
            e.preventDefault() 
            console.log('111')
            tabList.splice(index,1)
            render_Tab()
         }

      })
   })
}
render_Tab()


$('.add_tab').on('click', ()=>{
   let temp_url = window.prompt('输入需要添加的网站')
   if (temp_url.indexOf('http') !== 0) {
      temp_url = 'https://' + temp_url
    }
   tabList.push({
      tab_url:temp_url,
      tab_icon:temp_url+'/favicon.ico',
      tab_name:simplifyUrl(temp_url)[0].toUpperCase(),
   }
   )
   render_Tab()
})


window.onbeforeunload = () => {
   const string = JSON.stringify(tabList)
   console.log(string)
   localStorage.setItem('x', string)

 }
 $('.search>input').on('keypress', (e)=>{
    e.stopPropagation()
 })

 $(document).on('keypress', (e)=>{
   const {key} = e
   for (let i = 0; i < tabList.length; i++) {
     if (tabList[i].tab_name.toLowerCase() === key) {
       window.open(tabList[i].tab_url)
     }
   }
 })

