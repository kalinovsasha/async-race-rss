(()=>{"use strict";var e={379:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});const i=n.p+"884d54e1c09f1a3349e7372a98138c3c.mp3"},162:(e,t,n)=>{n.r(t)},682:(e,t,n)=>{n.r(t)},496:(e,t,n)=>{n.r(t)},272:(e,t,n)=>{n.r(t)},307:(e,t,n)=>{n.r(t)},206:(e,t,n)=>{n.r(t)},158:(e,t,n)=>{n.r(t)},883:(e,t,n)=>{n.r(t)},755:(e,t,n)=>{n.r(t)},932:(e,t,n)=>{n.r(t)},892:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Router=void 0,t.Router=class{constructor(){this.subscribers=[],window.addEventListener("hashchange",(e=>{const t=e.newURL.slice(e.newURL.indexOf("#")+1);this.dispatchEvent(t)})),setTimeout((()=>{this.dispatchEvent(document.location.hash.slice(1))}),5)}subscribe(e){this.subscribers.push(e)}dispatchEvent(e){console.log(document.location.hash.slice(1)),this.subscribers.forEach((t=>t(e)))}}},282:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function o(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((i=i.apply(e,t||[])).next())}))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Service=t.EEVents=void 0;const r=n(724),a=n(974),o=s(n(379));var l;!function(e){e.renderCars="renderCars",e.carsCount="carsCount",e.selectCar="selectCar",e.pagination="pagination",e.raceStart="startRace",e.winRace="winRace"}(l=t.EEVents||(t.EEVents={})),t.Service=class{constructor(e,t){this.sound=new Audio(o.default),this.winnerTime=0,this.subscribersRender=[],this.subscribersCarCount=[],this.subscribersSelectCar=[],this.subscribersPagination=[],this.subscribersRace=[],this.subscribersWin=[],this.startRaceConfig=[],this.pageCount=1,this.curPage=1,this.sound.volume=.35,this.carsOnCurPage=[],this.countCarsOnPage=e,this.baseUrl=t,this.getCars()}subscribe(e,t){switch(e){case l.carsCount:this.subscribersCarCount.push(t);break;case l.pagination:this.subscribersPagination.push(t);break;case l.renderCars:this.subscribersRender.push(t);break;case l.selectCar:this.subscribersSelectCar.push(t);break;case l.raceStart:this.subscribersRace.push(t);break;case l.winRace:this.subscribersWin.push(t)}}dispatchEvent(e,t){return i(this,void 0,void 0,(function*(){switch(e){case l.carsCount:this.subscribersCarCount.forEach((e=>e(t)));break;case l.pagination:this.subscribersPagination.forEach((e=>e(t)));break;case l.renderCars:this.subscribersRender.forEach((e=>e(t)));break;case l.selectCar:this.subscribersSelectCar.forEach((e=>e(t)));break;case l.raceStart:const e=yield Promise.all(this.startRaceConfig);for(let n=0;n<this.subscribersRace.length;n+=1)this.subscribersRace[n]({race:t,result:e[n].result});break;case l.winRace:this.subscribersWin.forEach((e=>e(t)))}}))}getCars(){return i(this,void 0,void 0,(function*(){const e=yield(0,r.getCars)(this.countCarsOnPage,this.curPage,this.baseUrl);null!==e&&(this.subscribersRace=[],this.carsOnCurPage=e.data,this.pageCount=Math.ceil(Number(e.pageCount)/this.countCarsOnPage),this.dispatchEvent(l.renderCars,e.data),this.dispatchEvent(l.carsCount,e.pageCount),this.dispatchEvent(l.pagination,{curPage:this.curPage,pageCount:this.pageCount}))}))}addCar(e){return i(this,void 0,void 0,(function*(){yield(0,r.createCar)(e).then((()=>this.getCars()))}))}removeCar(e){var t;return i(this,void 0,void 0,(function*(){yield(0,r.deleteCar)(e).then((()=>this.getCars())),this.curPage>1&&0===(null===(t=this.carsOnCurPage)||void 0===t?void 0:t.length)&&this.prevPage(),yield(0,r.deleteWinner)(e)}))}updateCar(e){return i(this,void 0,void 0,(function*(){this.selectedCar&&(e.id=this.selectedCar,yield(0,r.updateCar)(e),this.getCars())}))}generateCars(){return i(this,void 0,void 0,(function*(){(0,a.generateRandomCars)(100).forEach((e=>this.addCar(e)))}))}selectCar(e){return i(this,void 0,void 0,(function*(){this.selectedCar=e;const t=yield(0,r.getCar)(e,this.baseUrl);t&&this.dispatchEvent(l.selectCar,{color:t.color,name:t.name})}))}nextPage(){return i(this,void 0,void 0,(function*(){this.curPage<this.pageCount&&(this.curPage+=1,yield this.getCars(),this.dispatchEvent(l.pagination,{curPage:this.curPage,pageCount:this.pageCount}))}))}prevPage(){return i(this,void 0,void 0,(function*(){this.curPage>1&&(this.curPage-=1,yield this.getCars(),this.dispatchEvent(l.pagination,{curPage:this.curPage,pageCount:this.pageCount}))}))}startCarEngine(e){return i(this,void 0,void 0,(function*(){return yield(0,r.startEngine)(e)}))}stopCarEngine(e){return i(this,void 0,void 0,(function*(){return yield(0,r.stopEngine)(e)}))}switchToDrive(e){return i(this,void 0,void 0,(function*(){return yield(0,r.switchToDrive)(e)}))}startRace(){return i(this,void 0,void 0,(function*(){this.sound.play(),this.winnerTime=0,this.carsOnCurPage&&(this.startRaceConfig=this.carsOnCurPage.map((e=>i(this,void 0,void 0,(function*(){return yield this.startCarEngine(e.id)}))))),this.dispatchEvent(l.raceStart,!0)}))}resetRace(){this.sound.pause(),this.sound.currentTime=0,this.dispatchEvent(l.raceStart,!1)}winRace(e,t,n){return i(this,void 0,void 0,(function*(){if(0===this.winnerTime){this.winnerTime=t,this.dispatchEvent(l.winRace,{time:t/1e3,name:n});const i=yield(0,r.getWinner)(e);404===i.status?yield(0,r.createWinner)({id:e,wins:1,time:Number((t/1e3).toFixed(2))}):i.result.time>Number((t/1e3).toFixed(2))?(0,r.updateWinner)({id:e,wins:i.result.wins+1,time:Number((t/1e3).toFixed(2))}):(0,r.updateWinner)({id:e,wins:i.result.wins+1,time:i.result.time})}}))}}},384:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function o(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ServiceWinners=t.EWinnersSort=t.EEventsWiners=void 0;const s=n(724);var r,a;!function(e){e.renderWiners="renderWiners",e.winnersCount="winnersCount"}(r=t.EEventsWiners||(t.EEventsWiners={})),function(e){e.id="id",e.time="time",e.wins="wins"}(a=t.EWinnersSort||(t.EWinnersSort={})),t.ServiceWinners=class{constructor(e,t){this.currentWinners=[],this.subscribersRenderWinners=[],this.subscribersWinnersCount=[],this.winnersOnPage=10,this.pageCount=1,this.currentPage=1,this.curentSort=a.id,this.currentOrder="DESC",t&&(this.winnersOnPage=t),this.baseUrl=e,this.getWinners()}subscribe(e,t){switch(e){case r.renderWiners:this.subscribersRenderWinners.push(t);break;case r.winnersCount:this.subscribersWinnersCount.push(t)}}dispatchEvent(e,t){switch(e){case r.renderWiners:this.subscribersRenderWinners.forEach((e=>e(t)));break;case r.winnersCount:this.subscribersWinnersCount.forEach((e=>e(t)))}}getWinners(){var e,t,n;return i(this,void 0,void 0,(function*(){const i=yield(0,s.getAllWinners)(this.currentPage,this.curentSort,this.currentOrder),a=[];if(i){this.currentWinners=null==i?void 0:i.result,this.pageCount=Math.floor(i.totalCount/this.winnersOnPage);for(let r=0;r<(null==i?void 0:i.result.length);r++){const o=yield(0,s.getCar)(i.result[r].id,this.baseUrl);a.push({id:null===(e=i.result[r])||void 0===e?void 0:e.id,wins:null===(t=i.result[r])||void 0===t?void 0:t.wins,time:null===(n=i.result[r])||void 0===n?void 0:n.time,color:null==o?void 0:o.color,name:null==o?void 0:o.name,curPage:this.currentPage})}}this.pageCount=Math.ceil(Number(null==i?void 0:i.totalCount)/this.winnersOnPage),yield this.getWinnersCount(),this.dispatchEvent(r.renderWiners,JSON.stringify(a))}))}getWinnersCount(){return i(this,void 0,void 0,(function*(){const e=yield(0,s.getAllWinners)(1);(null==e?void 0:e.totalCount)?this.dispatchEvent(r.winnersCount,{pageCount:this.pageCount,winnersCount:Number(e.totalCount),curPage:this.currentPage}):this.dispatchEvent(r.winnersCount,{pageCount:this.pageCount,curPage:this.currentPage,winnersCount:0})}))}nextPage(){return i(this,void 0,void 0,(function*(){this.currentPage<this.pageCount&&(this.currentPage+=1,yield this.getWinners(),this.dispatchEvent(r.winnersCount,{curPage:this.currentPage,pageCount:this.pageCount}))}))}prevPage(){return i(this,void 0,void 0,(function*(){this.currentPage>1&&(this.currentPage-=1,yield this.getWinners(),this.dispatchEvent(r.winnersCount,{curPage:this.currentPage,pageCount:this.pageCount}))}))}changeSortType(e,t="ASC"){return i(this,void 0,void 0,(function*(){this.curentSort=e,this.currentOrder=t,yield this.getWinners()}))}}},789:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0,t.BaseComponent=class{constructor(e,t="div",n=[]){this.element=document.createElement(t),n.length&&this.element.classList.add(...n),this.root=e,this.root.append(this.element)}remove(){this.element.remove()}add(){this.root.append(this.element)}}},724:function(e,t){var n=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function o(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.deleteWinner=t.updateWinner=t.createWinner=t.getWinner=t.getAllWinners=t.stopEngine=t.switchToDrive=t.startEngine=t.deleteCar=t.updateCar=t.createCar=t.getCar=t.getCars=t.baseUrl=void 0,t.baseUrl="http://127.0.0.1:3000",t.getCars=function(e,t,i){return n(this,void 0,void 0,(function*(){let n,s,r;try{return n=yield fetch(`${i}/garage?_limit=${e}&_page=${t}`),200===n.status?(s=yield n.json(),r=n.headers.get("X-Total-Count")||"0",{data:s,pageCount:r}):null}catch(e){return null}}))},t.getCar=function(e,t){return n(this,void 0,void 0,(function*(){let n,i;try{return n=yield fetch(`${t}/garage/${e}`),200===n.status?(i=yield n.json(),i):null}catch(e){return null}}))},t.createCar=e=>n(void 0,void 0,void 0,(function*(){let n,i;try{return i=yield fetch(`${t.baseUrl}/garage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=yield i.json(),201===i.status?n:null}catch(e){return null}})),t.updateCar=e=>n(void 0,void 0,void 0,(function*(){let n,i;try{return i=yield fetch(`${t.baseUrl}/garage/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=yield i.json(),200===i.status?n:null}catch(e){throw new Error(`${e}`)}})),t.deleteCar=e=>n(void 0,void 0,void 0,(function*(){try{yield fetch(`${t.baseUrl}/garage/${e}`,{method:"DELETE"})}catch(e){throw new Error(`Oh no! ${e}`)}})),t.startEngine=e=>n(void 0,void 0,void 0,(function*(){try{const n=yield fetch(`${t.baseUrl}/engine?id=${e}&status=started`,{method:"PATCH"}),i=yield n.json();return{status:n.status,result:i}}catch(e){throw new Error(`${e}`)}})),t.switchToDrive=e=>n(void 0,void 0,void 0,(function*(){try{return(yield fetch(`${t.baseUrl}/engine?id=${e}&status=drive`,{method:"PATCH"})).status}catch(e){throw new Error(`${e}`)}})),t.stopEngine=e=>n(void 0,void 0,void 0,(function*(){try{return(yield fetch(`${t.baseUrl}/engine?id=${e}&status=stopped`,{method:"PATCH"})).status}catch(e){throw new Error(`${e}`)}})),t.getAllWinners=(e,i="time",s="ASC",r=10)=>n(void 0,void 0,void 0,(function*(){try{const n=yield fetch(`${t.baseUrl}/winners?_page=${e}&_limit=${r}&_sort=${i}&_order=${s}`);return{result:yield n.json(),totalCount:Number(n.headers.get("X-Total-Count"))||0}}catch(e){throw new Error(`${e}`)}})),t.getWinner=e=>n(void 0,void 0,void 0,(function*(){try{const n=yield fetch(`${t.baseUrl}/winners/${e}`),i=yield n.json();return{status:n.status,result:i}}catch(e){throw new Error(`${e}`)}})),t.createWinner=e=>n(void 0,void 0,void 0,(function*(){let n,i;try{return i=yield fetch(`${t.baseUrl}/winners`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),201===i.status?(n=yield i.json(),n):i.status}catch(e){throw new Error(`${e}`)}})),t.updateWinner=e=>n(void 0,void 0,void 0,(function*(){let n,i;try{return i=yield fetch(`${t.baseUrl}/winners/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),200===i.status?(n=yield i.json(),n):i.status}catch(e){throw new Error(`${e}`)}})),t.deleteWinner=e=>n(void 0,void 0,void 0,(function*(){try{yield fetch(`${t.baseUrl}/winners/${e}`,{method:"DELETE"})}catch(e){throw new Error(`${e}`)}}))},47:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(s,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function o(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((i=i.apply(e,t||[])).next())}))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Car=void 0;const r=n(789);n(162);const a=n(292),o=s(n(50)),l=n(282);class c extends r.BaseComponent{constructor(e,t,n,s,c){super(e,"div",["carContainer"]),this.isRace=!1,this.service=t,this.carId=s,this.carName=n;const d=new r.BaseComponent(this.element,"div",["carControls"]),h=new r.BaseComponent(d.element,"button",["carControls__select"]);h.element.textContent="Select";const u=new r.BaseComponent(d.element,"button",["carControls__remove"]);u.element.textContent="Remove",new r.BaseComponent(d.element,"h4",["carControls__carName"]).element.textContent=n;const C=new r.BaseComponent(this.element,"div",["engineControls"]);this.engineStartBtn=new r.BaseComponent(C.element,"button",["engineControls__start"]),this.engineStartBtn.element.textContent="A",this.engineStopBtn=new r.BaseComponent(C.element,"button",["engineControls__stop","engineControls_disabled"]),this.engineStopBtn.element.textContent="B",this.trackContainer=new r.BaseComponent(this.element,"div",["track"]),this.car=new r.BaseComponent(this.trackContainer.element,"div",["car"]),this.car.element.innerHTML=(0,a.carImage)(c,"car-image-svg"),new r.BaseComponent(this.trackContainer.element,"img",["finishFlag"]).element.setAttribute("src",o.default),u.element.onclick=()=>t.removeCar(this.carId),h.element.onclick=()=>t.selectCar(this.carId),this.engineStartBtn.element.onclick=()=>i(this,void 0,void 0,(function*(){this.engineStartBtn.element.classList.add("engineControls_disabled");const e=yield this.service.startCarEngine(this.carId);this.startEngine(e.result)})),this.engineStopBtn.element.onclick=()=>i(this,void 0,void 0,(function*(){yield t.stopCarEngine(s),this.reset()})),t.subscribe(l.EEVents.raceStart,this.raceHandler.bind(this))}startEngine(e){return i(this,void 0,void 0,(function*(){this.engineStopBtn.element.classList.remove("engineControls_disabled"),this.engineStartBtn.element.classList.add("engineControls_disabled");const t=e.distance/e.velocity,n=(this.trackContainer.element.clientWidth-110)/t*20;let i=0;return this.animation=setInterval((()=>{this.car.element.style.left=`${i}px`,i<this.trackContainer.element.clientWidth-110?i+=n:(this.isRace&&this.service.winRace(this.carId,t,this.carName),clearInterval(this.animation))}),20),500===(yield this.service.switchToDrive(this.carId))?(this.stopEngine(),500):200}))}stopEngine(){clearInterval(this.animation)}reset(){this.engineStopBtn.element.classList.add("engineControls_disabled"),clearInterval(this.animation),this.engineStartBtn.element.classList.remove("engineControls_disabled"),this.car.element.style.left="0px"}raceHandler(e){return i(this,void 0,void 0,(function*(){return e.race?(this.isRace=!0,yield this.startEngine(e.result)):(this.reset(),this.isRace=!1,200)}))}}t.Car=c},292:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.carImage=void 0,t.carImage=function(e,t){return`\n    <svg class="${t}" version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 569" ">\n      <title>1918554-svg</title>\n      <style>\n        tspan { white-space:pre }\n      </style>\n      <g id="Layer">\n        <path id="Layer" fill-rule="evenodd" style="fill: ${e}" d="M382.2 112.9L386.9 115.9L405.7 114.5C535.1 105 645.1 108.8 694.9 124.5C720.8 132.7 798.8 173.4 880.1 221.1L903.7 235L926.6 235C979.6 235.1 1079.7 245.3 1132 256.1C1185.5 267.1 1226.6 278.7 1248.8 289.1C1266.8 297.5 1272.5 303 1277.1 316.5C1279.3 323 1279.5 324.9 1279.4 342.5C1279.3 361.6 1278.4 372.3 1275.3 392.2C1273.7 402.4 1273.7 403.3 1275.5 411.2C1276.6 415.8 1277.4 423.1 1277.5 427.5C1277.5 434.5 1277.1 436.1 1274.7 440.2C1269.6 448.9 1262.3 452.6 1244.3 455.4C1235.1 456.8 1197.2 459.6 1196.5 458.8C1196.3 458.6 1196.9 455.3 1197.7 451.5C1199.7 442.6 1200 416.9 1198.2 408.5C1191.9 379 1176.1 355.5 1152.2 339.8C1112.6 314 1067.8 314.9 1027.9 342.2C999.7 361.4 984.8 386.1 982 418.1C980.9 431.7 983.2 455.5 986.5 464.2C987.2 465.9 972.5 466 687 466L386.8 466L387.6 457.8C389.2 442.4 388.5 416.5 386.3 405.9C379.5 374.1 358.1 347.6 326.5 331.7C277.7 307.3 214.1 326.7 186 374.6C176.4 391.1 172.1 407.5 171.4 430.5L170.9 446.5L167.7 446.3C155.9 445.6 69.4 437.4 59 435.9C40.2 433.3 25.2 425.7 23.5 417.8C22.6 413.8 17.6 408.4 10.3 403.5C7.1 401.4 4.4 399.5 4.2 399.4C3 398.8 0.9 380.4 1.4 375C2.4 365.3 2.4 364.9 1.1 359.1C-1.5 346.7 0.9 323 5.9 312.4C8.6 306.6 14 301 16.9 301C17.9 301 18 298.9 17.5 292.2C16 273 16.4 265.1 19.4 255.2C22.4 245.2 22.3 241.1 18.9 237.5C17.1 235.5 17.1 235.3 21.8 227.5L26.5 219.5L38 219.3C63.8 218.8 89.9 216.2 100 213C101.9 212.4 110.4 211.5 118.9 211C138.8 209.7 144.7 208.3 161 200.6C186.5 188.5 243.9 164.9 321.3 134.5C332.2 130.2 341.5 126 341.9 125.1C342.4 124.2 343.1 121 343.5 118C344.6 108.7 345.3 107.7 352.5 105.9C359.9 104 373 107.1 382.2 112.9ZM542.4 132.5L523 132.4C501 132.4 496.6 132.5 472 134C390.1 139.1 347.1 148.2 310.2 168C296.6 175.4 292.2 178.8 291 182.8C288.2 192.9 290.7 206.3 296.9 215.4C307.8 231.3 318.5 235.3 354.2 236.9C392.4 238.7 558.9 243.4 559.6 242.7C559.9 242.4 555.8 211.1 552.5 188.5C549.5 167.5 545 141.5 543.7 137L542.4 132.5ZM583 134L578.3 134L595.8 188L613.4 242L794.2 242L793.3 237.7C791.8 230.1 792.4 222.7 794.8 218.8C797.4 214.7 804 211 808.8 211C810.6 211 812 210.7 812 210.2C811.9 209 788.1 191.9 774 183.1C747.1 166.2 723 155.1 702 149.9C680.3 144.6 646.9 139.6 608.6 136C597.1 134.9 585.5 134 583 134Z" />\n        <path id="Layer" fill-rule="evenodd" style="fill: black" d="M306.2 328.9C343.9 338.7 372.8 367.9 382.2 405.7C385.2 417.6 385.4 440.7 382.6 452.4C370.9 502.4 325.7 536.6 275 533.7C230 531.1 191.6 499.6 180.3 456C177.2 444.2 176.2 426.7 177.9 415C184.3 371.5 218.6 335.7 261.7 327.5C272.6 325.5 295.7 326.2 306.2 328.9ZM267.5 357.4C252.7 360.2 240.1 367 229 378C217.8 389.2 211.4 401.4 208.4 416.6C197.9 471.7 252.2 518 305.3 499.4C328.4 491.4 346.8 471.2 352.6 447.5C355 438 354.9 420.7 352.6 412C348.5 396.9 339.1 382.1 327.5 372.7C320.4 367 307.9 360.6 299.5 358.5C291 356.3 275.9 355.8 267.5 357.4Z" />\n        <path id="Layer" style="fill: black" d="M291.8 383.2C292 392.2 292.5 399.9 293 400.4C294.7 402.1 303.8 394.6 313.1 383.8L318.2 378.1L313.4 375C308.2 371.7 300.3 368.5 294.9 367.5L291.5 366.9L291.8 383.2Z" />\n        <path id="Layer" style="fill: black" d="M259.1 370C252.9 372.2 242.4 378.2 242.7 379.4C243 380.7 266.4 401 267.6 401C268.3 401 269.1 400.3 269.4 399.4C270.2 397.4 270.2 386.7 269.3 376.2C268.6 366.7 268.5 366.6 259.1 370Z" />\n        <path id="Layer" style="fill: black" d="M320.9 404.5C315.2 410.9 310.4 416.8 310.2 417.6C309.6 420.1 314.8 421.1 325.9 420.5C331.7 420.2 338 419.7 339.8 419.4C343.1 418.9 343.2 418.8 342.5 415.2C341.8 410.8 336.1 398.5 333.3 395.1L331.4 392.7L320.9 404.5Z" />\n        <path id="Layer" style="fill: black" d="M226 399.1C222.9 403.5 219.2 412.4 218.3 417.7L217.7 421L233.2 421C249.7 421 253.3 420.1 251.3 416.6C250 414.2 230.9 395 229.9 395C229.4 395 227.7 396.8 226 399.1Z" />\n        <path id="Layer" style="fill: black" d="M278.6 404.6C275 408.1 278.6 413.3 283 411C285.6 409.6 285.6 405.4 283.1 404C280.6 402.7 280.4 402.7 278.6 404.6Z" />\n        <path id="Layer" style="fill: black" d="M275.1 421.4C269.4 424.6 268.3 432.5 272.9 437.1C277.2 441.3 283 441.4 287.2 437.2C291.4 433 291.3 427.2 287.1 422.9C283.8 419.7 279.3 419.1 275.1 421.4Z" />\n        <path id="Layer" style="fill: black" d="M256 426.4C254.1 428.7 255.2 432.5 257.8 432.8C262.2 433.5 264.5 429.6 261.4 426.6C259.5 424.6 257.6 424.6 256 426.4Z" />\n        <path id="Layer" style="fill:black}" d="M300.2 427.6C297.5 429.5 297.4 431.2 299.9 433.4C302.4 435.7 306 434 306 430.5C306 427.2 303 425.6 300.2 427.6Z" />\n        <path id="Layer" style="fill: black" d="M224.5 440.7C216.8 441.3 216.9 441.2 218.6 447.2C220.2 452.7 224.7 461.8 227.8 465.8L229.6 468.1L239.9 455.9C245.6 449.2 250.3 443 250.4 442.1C250.5 440.7 249 440.5 240 440.4C234.2 440.4 227.3 440.5 224.5 440.7Z" />\n        <path id="Layer" style="fill: black" d="M316.5 441.9C312.1 442.3 310.4 442.9 310.2 444.1C309.9 445.7 331.2 467 333 467C335.2 467 341.6 452.9 343.5 444.2L344.2 441L333.3 441.2C327.4 441.3 319.8 441.6 316.5 441.9Z" />\n        <path id="Layer" style="fill: black" d="M277.6 448.6C275.7 450.4 275.7 450.6 277 453.1C277.6 454.2 279.1 455 280.5 455C282.5 455 285 452.6 285 450.6C285 449.6 281.8 447 280.5 447C279.8 447 278.4 447.7 277.6 448.6Z" />\n        <path id="Layer" style="fill: black" d="M258.9 465.7C250.3 474.7 245 480.8 245 481.9C245 484.4 262.9 492 268.6 492L271.3 492L270.6 477.7C269.7 461.1 269.3 459 267.1 459C266.2 459 262.5 462 258.9 465.7Z" />\n        <path id="Layer" style="fill: black" d="M293.6 459.9C293 460.9 291.2 476.7 290.7 485.7C290.4 491.7 290.5 492 292.6 492C300.5 492 318.8 485.2 317.4 482.8C316.9 482.1 312.1 476.4 306.6 470.2C297.3 459.7 294.9 457.8 293.6 459.9Z" />\n        <path id="Layer" fill-rule="evenodd" style="fill: black" d="M1177.4 372.3C1211.7 424 1193.4 494.1 1138.2 522.3C1112.5 535.4 1085.4 537.5 1058 528.4C1045.7 524.3 1038.1 520.2 1026.9 511.8C988.2 482.6 975.7 427.1 998 383C1012.6 354.1 1040.5 333.3 1072.3 327.5C1112.3 320.2 1154.9 338.4 1177.4 372.3ZM1068.9 359.5C1036.5 370 1015.3 400.5 1017.3 434C1018.9 460.8 1034.6 484.4 1058.5 496C1104.4 518.2 1157.3 489.4 1164 438.6C1168.7 403.3 1145.6 368.8 1110.8 359C1097.8 355.3 1081.1 355.5 1068.9 359.5Z" />\n        <path id="Layer" style="fill: black" d="M1101.7 383.2C1102 392.2 1102.6 399.9 1103.1 400.4C1104.4 401.8 1108.4 398.6 1118.6 388.2L1128.1 378.5L1125.8 376.7C1120.8 372.7 1106.9 367 1102.3 367C1101.3 367 1101.2 370.3 1101.7 383.2Z" />\n        <path id="Layer" style="fill: black" d="M1070.5 369.4C1065.5 371 1057.2 375.2 1054.2 377.6L1051.9 379.5L1064 390.2C1070.7 396.2 1076.8 401 1077.5 401C1079.8 401 1080.2 397.1 1079.5 382.4C1078.7 366.2 1079.1 366.7 1070.5 369.4Z" />\n        <path id="Layer" style="fill: black" d="M1130.7 404.6C1124.8 411.1 1120 417.2 1120 418.2C1120 419.3 1121.1 420 1123.8 420.4C1128.2 421.1 1151.6 419.7 1152.7 418.7C1154.2 417.1 1147.6 400.4 1143.3 395.1L1141.4 392.7L1130.7 404.6Z" />\n        <path id="Layer" style="fill: black" d="M1036.2 398.7C1032.3 404.9 1029.2 412.1 1028.4 417.1L1027.7 421L1042.9 421C1051.5 421 1059 420.5 1060.1 420C1061.8 419 1061.9 418.7 1060.6 416.2C1059.8 414.7 1054.7 409.1 1049.2 403.7L1039.3 393.8L1036.2 398.7Z" />\n        <path id="Layer" style="fill: black" d="M1088.8 404.1C1086.4 405.5 1086.5 409.7 1089 411C1093.4 413.3 1097 408.1 1093.4 404.6C1091.6 402.7 1091.1 402.7 1088.8 404.1Z" />\n        <path id="Layer" style="fill: black" d="M1085.1 421.3C1080.2 424.2 1078.5 431.4 1081.6 435.9C1082.5 437.2 1084.8 438.8 1086.6 439.6C1089.5 440.8 1090.5 440.8 1093.4 439.6C1103.3 435.5 1101.9 421.6 1091.5 420.4C1089.1 420.1 1086.5 420.5 1085.1 421.3Z" />\n        <path id="Layer" style="fill: black" d="M1066 426.4C1064.1 428.7 1065.2 432.5 1067.8 432.8C1072.2 433.5 1074.5 429.6 1071.4 426.6C1069.5 424.6 1067.6 424.6 1066 426.4Z" />\n        <path id="Layer" style="fill: black" d="M1109.6 427.6C1108.7 428.4 1108 429.8 1108 430.5C1108 431.8 1110.6 435 1111.6 435C1113.6 435 1116 432.5 1116 430.5C1116 429.1 1115.2 427.6 1114.1 427C1111.6 425.7 1111.4 425.7 1109.6 427.6Z" />\n        <path id="Layer" style="fill: black" d="M1033.5 440.9C1027.5 441.5 1027.5 441.5 1027.8 444.5C1028.7 451.4 1038.2 469.3 1040 467.4C1045.7 461.3 1061 442.4 1060.7 441.6C1060.3 440.4 1043.1 439.9 1033.5 440.9Z" />\n        <path id="Layer" style="fill: black" d="M1126.7 441.7C1119.9 442.2 1118.8 443.6 1122 447.7C1124.3 450.8 1142 467 1143 467C1143.3 467 1145 464.6 1146.7 461.7C1149.6 456.9 1151.9 450.6 1153.4 443.7L1154 441L1143.3 441.2C1137.3 441.3 1129.9 441.5 1126.7 441.7Z" />\n        <path id="Layer" style="fill: black" d="M1087 449C1085.4 452.1 1087.4 455.2 1090.8 454.8C1092.9 454.6 1093.6 453.9 1093.8 451.6C1094.3 447.1 1089.1 445.1 1087 449Z" />\n        <path id="Layer" style="fill: black" d="M1065.1 469.7C1059.5 475.6 1055 481 1055 481.7C1055 484.5 1072.2 492 1078.7 492L1081.3 492L1080.6 479.7C1079.6 461.8 1079.1 459 1077 459C1076 459 1070.7 463.8 1065.1 469.7Z" />\n        <path id="Layer" style="fill: black" d="M1103.5 459.9C1102.8 461.1 1101.2 474.3 1100.6 484.2C1100.2 491.9 1100.2 492 1102.5 492C1107 492 1115.5 489.8 1121.8 486.9L1128.2 484L1126.3 481.7C1119.8 473.5 1106.5 459 1105.4 459C1104.7 459 1103.9 459.4 1103.5 459.9Z" />\n      </g>\n    </svg>`}},582:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GarageControls=void 0;const i=n(789),s=n(282),r=n(263);n(682);class a extends i.BaseComponent{constructor(e,t,n){super(e,"div",["garage__controls"]),new r.inputCarColor(this.element,t.addCar.bind(t),["create-car","inputContainer"],{btnTxt:"Create",color:"#000000",text:""});const a=new r.inputCarColor(this.element,t.updateCar.bind(t),["update-car","inputContainer"],{btnTxt:"Update",color:n.color,text:n.text}),o=new i.BaseComponent(this.element,"div",["race-control"]);this.race=new i.BaseComponent(o.element,"button",["btn"]),this.race.element.textContent="Race",this.reset=new i.BaseComponent(o.element,"button",["btn"]),this.reset.element.textContent="Reset",this.generate=new i.BaseComponent(o.element,"button",["btnLong"]),this.generate.element.textContent="Generate cars",t.subscribe(s.EEVents.selectCar,a.changeState.bind(a)),this.generate.element.onclick=()=>t.generateCars(),this.race.element.onclick=()=>{this.race.element.classList.add("garage_disable"),this.reset.element.classList.add("garage_disable"),this.generate.element.classList.add("garage_disable"),t.startRace()},this.reset.element.onclick=()=>{this.race.element.classList.remove("garage_disable"),t.resetRace()}}resetStyles(){this.reset.element.classList.remove("garage_disable"),this.generate.element.classList.remove("garage_disable")}}t.GarageControls=a},121:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GaragePage=void 0;const i=n(789),s=n(582),r=n(128);n(496);const a=n(585),o=n(282),l=n(319);class c extends i.BaseComponent{constructor(e,t,n){super(e,"div",["garageContainer"]),this.service=t,this.carsCounter="0",this.currentPage=1,this.garaControls=new s.GarageControls(this.element,t,{color:"#000000",text:""}),this.carCountEl=new i.BaseComponent(this.element,"h2",["garage__carCount"]),this.carCountEl.element.textContent=`Garage (${this.carsCounter})`,this.pageNumber=new i.BaseComponent(this.element,"h3",["garage__page"]),this.pageNumber.element.textContent=`page #${this.currentPage}`;const c=new r.Garage(this.element,t,n),d=new a.Pagination(this.element,t),h=new l.Popup(this.element);t.subscribe(o.EEVents.renderCars,c.rendrCars.bind(c)),t.subscribe(o.EEVents.winRace,h.showWinner.bind(h)),t.subscribe(o.EEVents.winRace,this.garaControls.resetStyles.bind(this.garaControls)),t.subscribe(o.EEVents.pagination,d.disableButton.bind(d))}setcarsCounter(e){this.carsCounter=e,this.carCountEl.element.textContent=`Garage (${this.carsCounter})`}setPage(e){this.currentPage=e.curPage,this.pageNumber.element.textContent=`page #${this.currentPage}`}renderPage(e){"/garage"===e||""===e?this.element.classList.remove("garage__page_hidden"):this.element.classList.add("garage__page_hidden")}}t.GaragePage=c},128:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Garage=void 0;const i=n(789),s=n(47);n(272);class r extends i.BaseComponent{constructor(e,t,n){super(e,"div",["garage"]),this.service=t,n&&this.rendrCars(n)}rendrCars(e){if(this.element.innerHTML="",e)for(let t=0;t<e.length;t+=1)new s.Car(this.element,this.service,e[t].name,e[t].id,e[t].color)}}t.Garage=r},648:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const i=n(789);n(307);class s extends i.BaseComponent{constructor(e){super(e,"header",["header"]),this.btnGarage=new i.BaseComponent(this.element,"button",["btn-garage"]),this.btnWinners=new i.BaseComponent(this.element,"button",["btn-winners"]),this.btnGarage.element.textContent="Garage",this.btnWinners.element.textContent="Winners",this.btnGarage.element.onclick=()=>document.location.hash="/garage",this.btnWinners.element.onclick=()=>document.location.hash="/winners"}}t.Header=s},263:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.inputCarColor=void 0;const i=n(789);class s extends i.BaseComponent{constructor(e,t,n,s){super(e,"div",n),this.state=s,this.inputTxt=document.createElement("input"),this.inputTxt.setAttribute("type","txt"),this.inputTxt.classList.add(`${n[0]}__inputTxt`),this.inputTxt.value=s.text,this.element.append(this.inputTxt),this.inputColor=document.createElement("input"),this.inputColor.setAttribute("type","color"),this.inputColor.classList.add(`${n[0]}__inputColor`),this.inputColor.value=s.color,this.element.append(this.inputColor),this.btn=new i.BaseComponent(this.element,"button",[`${n[0]}__btnCreate`,"btn"]),this.btn.element.textContent=this.state.btnTxt,this.btn.element.onclick=()=>{t({name:this.inputTxt.value,color:this.inputColor.value})}}changeState(e){this.state.text=e.name,this.state.color=e.color,this.inputTxt.value=e.name,this.inputColor.value=e.color}}t.inputCarColor=s},585:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Pagination=void 0;const i=n(789);n(206);class s extends i.BaseComponent{constructor(e,t){super(e,"div",["paginationContainer"]),this.prevBtn=new i.BaseComponent(this.element,"button",["pagination__btn"]),this.nextBtn=new i.BaseComponent(this.element,"button",["pagination__btn"]),this.prevBtn.element.textContent="Prev",this.nextBtn.element.textContent="Next",this.prevBtn.element.onclick=()=>t.prevPage(),this.nextBtn.element.onclick=()=>t.nextPage()}disableButton(e){e.curPage===e.pageCount&&1===e.curPage?(this.nextBtn.element.classList.add("pagination__btn_disabled"),this.prevBtn.element.classList.add("pagination__btn_disabled")):e.curPage===e.pageCount?(this.nextBtn.element.classList.add("pagination__btn_disabled"),this.prevBtn.element.classList.remove("pagination__btn_disabled")):1===e.curPage?(this.nextBtn.element.classList.remove("pagination__btn_disabled"),this.prevBtn.element.classList.add("pagination__btn_disabled")):(this.nextBtn.element.classList.remove("pagination__btn_disabled"),this.prevBtn.element.classList.remove("pagination__btn_disabled"))}}t.Pagination=s},319:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Popup=void 0;const i=n(789);n(158);class s extends i.BaseComponent{constructor(e){super(e,"div",["popup"]),this.title=new i.BaseComponent(this.element,"h2",["popup__winner"]),this.element.remove()}showWinner(e){this.title.element.textContent=`Winner ${e.name} with time: ${e.time.toFixed(2)}`,this.root.append(this.element),setTimeout((()=>this.element.remove()),5e3)}}t.Popup=s},413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WinnersPage=void 0;const i=n(789),s=n(384);n(883);const r=n(74);class a extends i.BaseComponent{constructor(e,t){super(e,"div",["winnersPage"]),this.winnersCount=0,this.curPage=1,this.service=t,this.winnersCountEl=new i.BaseComponent(this.element,"h2",["winnersPage__winnersCount"]),this.winnersCurPage=new i.BaseComponent(this.element,"h2",["winnersPage__pagesCount"]),this.winnersCountEl.element.textContent=`Winners (${this.winnersCount})`,this.winnersCurPage.element.textContent=`page #${this.curPage}`,this.winnersTable=new r.WinnersTable(this.element,t),t.getWinners(),this.element.remove(),t.subscribe(s.EEventsWiners.renderWiners,this.winnersTable.renderWinners.bind(this.winnersTable))}setPageAndCount(e){e.winnersCount&&(this.winnersCount=e.winnersCount),this.curPage=e.curPage,this.winnersCountEl.element.textContent=`Winners (${this.winnersCount})`,this.winnersCurPage.element.textContent=`page #${this.curPage}`}renderPage(e){"/winners"===e?(this.service.getWinners(),this.root.append(this.element)):this.element.remove()}}t.WinnersPage=a},74:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WinnersTable=void 0;const i=n(789),s=n(384),r=n(292),a=n(585);n(755);class o extends i.BaseComponent{constructor(e,t){super(e,"div",["winnersTableContainer"]),this.tableItems="",this.currentOrder="DESC",this.service=t,this.tableHeaderContainer=new i.BaseComponent(this.element,"table",["winnersTableHeaders"]),this.tableHeader=new i.BaseComponent(this.tableHeaderContainer.element,"tr",["winnersTable__header"]),this.tableHeaderId=new i.BaseComponent(this.tableHeader.element,"td",["winnersTable__header__id","winnersTable__header_item"]),this.tableHeaderId.element.textContent="Number",this.tableHeaderCar=new i.BaseComponent(this.tableHeader.element,"td",["winnersTable__header__car","winnersTable__header_item"]),this.tableHeaderCar.element.textContent="Car",this.tableHeaderModel=new i.BaseComponent(this.tableHeader.element,"td",["winnersTable__header__model","winnersTable__header_item"]),this.tableHeaderModel.element.textContent="Model",this.tableHeaderWins=new i.BaseComponent(this.tableHeader.element,"td",["winnersTable__header__wins","winnersTable__header_item"]),this.tableHeaderWins.element.textContent="Wins",this.tableHeaderTime=new i.BaseComponent(this.tableHeader.element,"td",["winnersTable__header__time","winnersTable__header_item"]),this.tableHeaderTime.element.textContent="Time",this.table=new i.BaseComponent(this.element,"table",["winnersTable"]),this.table.element.innerHTML=this.tableItems;const n=new a.Pagination(this.element,this.service);t.subscribe(s.EEventsWiners.winnersCount,n.disableButton.bind(n)),this.tableHeaderWins.element.onclick=()=>{this.currentOrder="DESC"===this.currentOrder?"ASC":"DESC","DESC"===this.currentOrder?(this.tableHeaderTime.element.classList.remove("arrowUp"),this.tableHeaderTime.element.classList.remove("arrowDown"),this.tableHeaderWins.element.classList.add("arrowDown"),this.tableHeaderWins.element.classList.remove("arrowUp")):(this.tableHeaderTime.element.classList.remove("arrowUp"),this.tableHeaderTime.element.classList.remove("arrowDown"),this.tableHeaderWins.element.classList.add("arrowUp"),this.tableHeaderWins.element.classList.remove("arrowDown")),t.changeSortType(s.EWinnersSort.wins,this.currentOrder)},this.tableHeaderTime.element.onclick=()=>{"DESC"===this.currentOrder?(this.tableHeaderWins.element.classList.remove("arrowDown"),this.tableHeaderWins.element.classList.remove("arrowUp"),this.tableHeaderTime.element.classList.remove("arrowDown"),this.tableHeaderTime.element.classList.add("arrowUp")):(this.tableHeaderWins.element.classList.remove("arrowDown"),this.tableHeaderWins.element.classList.remove("arrowUp"),this.tableHeaderTime.element.classList.remove("arrowUp"),this.tableHeaderTime.element.classList.add("arrowDown")),this.currentOrder="DESC"===this.currentOrder?"ASC":"DESC",t.changeSortType(s.EWinnersSort.time,this.currentOrder)}}renderWinners(e){const t=JSON.parse(e);this.tableItems="";for(let e=0;e<t.length;e+=1){const n=(0,r.carImage)(t[e].color,"car-image-svg-winner");this.tableItems+=`\n    <tr class="winnersTable__row" >\n      <td class="winnersTable__coll winnersTable__id">${e+1+10*(t[e].curPage-1)}</td>\n      <td class="winnersTable__coll winnerImage">${n}</td>\n      <td class="winnersTable__coll winnersTable__model">${t[e].name}</td>\n      <td class="winnersTable__coll">${t[e].wins}</td>\n      <td class="winnersTable__coll">${t[e].time}</td>\n    </tr>\n      `}this.table.element.innerHTML=this.tableItems}}t.WinnersTable=o},974:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateRandomCars=void 0;const n=()=>{const e=["X","X5","X6","AMG","Turbo","Model X","Model S","Race","Sport","Passat","Golf","Granta","Sandero","Logan","Civic","Acord","Catafalq","Cooper","XC90","V60"],t=["BMW","Fiat","Mersedes","Audi","Volkswagen","Lada","Renault","Citroen","Honda","Toyota","KIA","Ford","Pontiac","Mini","Volvo"];return`${t[Math.floor(Math.random()*t.length)]} ${e[Math.floor(Math.random()*e.length)]}`},i=()=>{let e="#";for(let t=0;t<6;t+=1)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e};t.generateRandomCars=(e=100)=>new Array(e).fill(1).map((()=>({name:n(),color:i()})))},50:(e,t,n)=>{e.exports=n.p+"assets/icons/racing_flag.svg"}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{n(932);const e=n(648),t=n(121),i=n(282),s=n(413),r=n(384),a=n(892),o="http://127.0.0.1:3000",l=document.getElementById("root"),c=new a.Router,d=new i.Service(7,o),h=new r.ServiceWinners(o),u=(new e.Header(l),new t.GaragePage(l,d,[{name:"SERVER NE DOSTUPEN",color:"red",id:2}])),C=new s.WinnersPage(l,h);d.subscribe(i.EEVents.carsCount,u.setcarsCounter.bind(u)),d.subscribe(i.EEVents.pagination,u.setPage.bind(u)),h.subscribe(r.EEventsWiners.winnersCount,C.setPageAndCount.bind(C)),c.subscribe(u.renderPage.bind(u)),c.subscribe(C.renderPage.bind(C))})()})();