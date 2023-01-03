var API = 'http://localhost:8080'
var listAuth = []
var listBook = []
var listComment = []
var listContainer = []
var book = {}
var curAcc = ""
var edit = 0
var admin = 0
var image = ""
var infoAcc = {}
var customer = -1
start()
async function start() {
    curAcc = ""
    await getAuth()
    for (let i of listAuth) {
        if (i.is_connect == 1) {
            // connect = 1 
            infoAcc = i
            curAcc = i.name
            customer = i.id
            if (i.name == 'admin' && i.account == 'admin@gmail.com') admin = 1
            else admin = 0
            // console.log("i.name",i.name,i.account)
            break
        }
    }
    await getList(renderItem)
    await getContainer();
    // console.log('list', listAuth, listBook,  listContainer)
    var filterContainer = listContainer.filter(function (item) {
        return item.idd_customer == customer
    })
    listContainer = filterContainer
}

function renderItem(items) {
    // console.log("list", items)
    edit = 0
    book = {}
    // console.log("acc", window.localStorage.getItem('acc'))
    var id = 0
    var color = ''
    var acc = curAcc
    if (admin == 1) {
        var isAcc = acc != ''
            ? `<div>
                <button class="Signin" onclick="handleEditItem(${-1})">Thêm sách</button>
                <button class="Signin" onclick="dangxuat()">Đăng xuất</button>
            </div>`
            : `<div>
                <button class="Signin" onclick="dangnhap()">Đăng nhập</button>
                <button class="Signin" onclick="dangki()">Đăng kí</button>
            </div>`
    } else {
        // console.log("admin", admin)
        var isAcc = acc != ''
            ? `<div>
            <button class="Signin" onclick="container()">Giỏ hàng</button>
            <button class="Signin" onclick="dangxuat()">Đăng xuất</button>
        </div>`
            : `<div>
                <button class="Signin" onclick="dangnhap()">Đăng nhập</button>
                <button class="Signin" onclick="dangki()">Đăng kí</button>
            </div>`
    }

    var txtHello = acc == ''
        ? `` : `<h3>Hello, ${curAcc}!</h3>`
    document.querySelector(".container").innerHTML = `
    <div class="header">
            <div class="title">
                <h3>DANH SÁCH TÁC PHẨM</h3>
                ${txtHello}
                ${isAcc}
            </div>
            <ul class="itemList">
                <li class="itemListElement2 renderId">
                    <h3>ID</h3>
                </li>
                <li class="itemListElement2 titleBook">
                    <h3>Tiêu đề</h3>
                </li>
                <li class="itemListElement2 ">
                    <h3>Tác giả</h3>
                </li>
                <li class="itemListElement2 ">
                    <h3>Thể loại</h3>
                </li>
                <li class="itemListElement2 ">
                    <h3>Ngày phát hành</h3>
                </li>
                <li class="itemListElement2 renderId">
                    <h3>Trang</h3>
                </li>
                <li class="itemListElement2 "></li>
            </ul>
        </div>

        <div id="list"></div>
    `
    var htmls = items.map(function (item) {
        if (admin == 1) {
            var btn = acc == ''
                ? `` : ` 
            <button class="btnEdit" onclick="handleEditItem(${item.id})">
                Xem
            </button>
            <button class="btnDelete" onclick="handleDeleteItem(${item.id})">
                Xóa
            </button>`
        } else {
            var btn = acc == ''
                ? `` : ` 
            <button class="btnAddToBasket" onclick="handleEditItem(${item.id})">
                Xem chi tiết
            </button>`
        }
        id++
        color = id % 2 == 0 ? 'gray' : 'white'
        return `
            <div class="itemList2 ${color}">
                <div class="itemListElement renderId"><h4 class="text-align">${id}</h4></div>
                <div class="itemListElement titleBook"><h4 class="text-align">${item.title}</h4></div>
                <div class="itemListElement"><h4 class="text-align">${item.auth}</h4></div>
                <div class="itemListElement"><h4 class="text-align">${item.category}</h4></div>
                <div class="itemListElement"><h4 class="text-align">${item.update_day}</h4></div>
                <div class="itemListElement renderId"><h4 class="text-align">${item.num_of_pages}</h4></div>
                <div class="itemListElement">
                   ${btn}
                </div>
            </div>
        `
    })
    document.querySelector('#list').innerHTML = htmls.join('')
}

async function container() {
    var filterContainer = listContainer.filter(function (item) {
        return item.idd_customer == customer
    })
    listContainer = filterContainer
    document.querySelector(".container").innerHTML = `
    <div class="header">
            <div class="title">
                <h3>GIỎ HÀNG CỦA BẠN</h3>
                <h3>Người dùng: ${curAcc}</h3>
                <h3></h3>
            </div>
            <ul class="itemList">
                <li class="itemListElement2 renderId">
                    <h3>ID</h3>
                </li>
                <li class="itemListElement2 titleBook">
                    <h3>Tiêu đề</h3>
                </li>
                <li class="itemListElement2 ">
                    <h3>Tác giả</h3>
                </li>
                <li class="itemListElement2 renderId">
                    <h3>Số lượng</h3>
                </li>
                <li class="itemListElement2 renderId2">
                    <h3>Chọn</h3>
                </li>
                <li class="itemListElement2 "></li>
            </ul>
        </div>

        <div id="list"></div>
        <div class="footer">
            <button class="button-back" onclick="goBack()">
                <p>Quay lại</p>
            </button>
            <button class="button-back green" onclick="buyIt()">
                <p>Mua hàng</p>
            </button>
        </div>
    `
    // console.log("listContainer",listContainer)
    let curScreen = 2
    let id = 0
    if(listContainer.length >0){
    var htmls = listContainer.map(function (item) {
        var items = listBook.find(function(i){
            return i.id == item.idd_book
        })
        if (items == undefined){
             delItemContainer(item.id)
        }else{
            // console.log("item",item,items)
            id++
            color = id % 2 == 0 ? 'gray' : 'white'
                return `
                    <div class="itemList2 ${color}">
                        <div class="itemListElement renderId"><h4 class="text-align">${id}</h4></div>
                        <div class="itemListElement titleBook"><h4 class="text-align">${items.title}</h4></div>
                        <div class="itemListElement"><h4 class="text-align">${items.auth}</h4></div>
                        <div class="itemListElement renderId"><h4 class="text-align">${item.amount}</h4></div>
                        <div class="itemListElement renderId2">
                            <input type="checkbox" id="bought${item.id}" checked>
                        </div>
                        <div class="itemListElement">
                        <button class="btnEdit" onclick="handleEditItem(${items.id},${curScreen})">
                            Xem chi tiết
                        </button>
                        <button class="btnDelete" onclick="removeContainer(${item.id})">
                            Xóa khỏi giỏ hàng
                        </button>
                        </div>
                        </div>
                    </div>
                `
            
        }
    })
    // console.log("html",htmls)
    document.querySelector('#list').innerHTML = htmls.join('')
    }else{
        document.querySelector("#list").innerHTML = 
        `
            <h3 class="text-comfirm-del">Hiện tại đang không có gì trong giỏ hàng!?!</<h3>
        `
    }
    
}

async function buyIt(){
    var checkBuy = false
    listContainer.map(async function(item){
        var val =  document.getElementById(`bought${item.id}`).checked
        if (val == true){
            checkBuy = true
            await delItemContainer(item.id)
        }
        // console.log(`bought${item.id}`,val)
    })
    if(!checkBuy){
        alert("Bạn cần chọn ít nhất 1 mặt hàng")
        return
    }
    alert("Cảm ơn bạn đã mua hàng!!!")
    await getContainer(container)
}

async function dangnhap() {
    document.querySelector(".container").innerHTML = `
    <form action="#" class="info">
            <li class="input">
                <input type="email" id="acc" class="text-input" required placeholder="Nhập tài khoản">
            </li>
            <li class="input">
                <input type="password" id="password" class="text-input" required 
                placeholder="Nhập mật khẩu">
            </li>
            <li class="button-login-parent">
                <button class="button-login-child" onclick="signIn()">
                    <p class="text-button-login">Đăng nhập</p>
                </button>
                <button class="button-login-child" onclick="goBack()">
                    <p class="text-button-login">Quay lại</p>
                </button>
            </li>
            <li class="toDK">
                <h5>Bạn chưa có tài khoản?</h5>
                <button href="" class="textToDk" onclick="dangki()">
                    Đăng kí
                </button>
            </li>
        </form>
    `
}

async function removeContainer(id) {
    var htmls = `
            <div class="comfirm">
                <p class="text-comfirm-del">Bạn có chắc chắn muốn xóa khỏi giỏ hàng không?</p>
                <div class="main-confirm">
                    <button class="btncf" onclick="yesItem(${id})">Xóa</button>
                    <button class="btncf" onclick="noItem()">Hủy</button>
                </div>
                
            </div>
        `
    document.querySelector(".container").innerHTML = htmls

}

async function yesItem(id){
    await delItemContainer(id)
    await getContainer(container)
    alert("Xóa thành công khỏi giỏ hàng")
}

async function noItem(){
    await container()
}

async function handleDeleteItem(id) {
    var htmls = `
            <div class="comfirm">
                <p class="text-comfirm-del">Bạn có chắc chắn muốn xóa không?</p>
                <div class="main-confirm">
                    <button class="btncf" onclick="yes(${id})">Xóa</button>
                    <button class="btncf" onclick="no()">Hủy</button>
                </div>
                
            </div>
        `
    document.querySelector(".container").innerHTML = htmls

}

async function yes(id) {
    await delBook(id)
    await getList(renderItem)
    alert("Xóa thành công")
}

async function no() {
    await getList(renderItem)
}

async function handleEditItem(id, curScreen = 1,editCmtRating=false) {
    var rating = 5
    var cmtBook = []
    var cancelRating = 0
    var disabledRating = ''
    var ratingNone = 'rating'
    var checked1= ''
    var checked2= ''
    var checked3= ''
    var checked4= ''
    var checked5= ''
    var starLight5 = 'star'
    var starLight4 = 'star'
    var starLight3 = 'star'
    var starLight2 = 'star'
    var starLight1 = 'star'
    await getComment()
    var check = listContainer.find(function(item){
        return item.idd_book == id 
    })
    // console.log("listC",listComment)
    var listCmtBook = listComment.filter(function(item){
        return item.id_book == id 
    })
    listCmtBook.map(function(items){
        var cus = listAuth.find(function(item){
            // console.log("item",item,items)
            return item.id == items.id_customer
        })
        rating = rating + items.star
        cmtBook.push({
            cmt:items.cmt,
            name:cus.name,
            star:items.star,
            id_customer:items.id_customer, 
            id: items.id
        })
    })
    var displayRating = listCmtBook.find(function(item){
        return item.id_customer == customer
    })
    // console.log("displayRating",displayRating)
    if(displayRating != undefined ){
        if(!editCmtRating){
            switch (displayRating.star) {
                case 1:
                    checked1 = 'checked'
                    starLight1 = 'starLight'
                    break;
                case 2:
                    checked2 = 'checked'
                    starLight1 = 'starLight'
                    starLight2 = 'starLight'
                    break;
                case 3:
                    checked3 = 'checked'
                    starLight1 = 'starLight'
                    starLight2 = 'starLight'
                    starLight3 = 'starLight'
                    break;
                case 4:
                    checked4 = 'checked'
                    starLight1 = 'starLight'
                    starLight2 = 'starLight'
                    starLight3 = 'starLight'
                    starLight4 = 'starLight'
                    break;
                case 5:
                    checked5 = 'checked'
                    starLight1 = 'starLight'
                    starLight2 = 'starLight'
                    starLight3 = 'starLight'
                    starLight4 = 'starLight'
                    starLight5 = 'starLight'
                    break;
            }
            disabledRating = 'disabled'
            ratingNone = 'ratingNone'
        }else{
            switch (displayRating.star) {
                case 1:
                    checked1 = 'checked'
                    break;
                case 2:
                    checked2 = 'checked'
                    break;
                case 3:
                    checked3 = 'checked'
                    break;
                case 4:
                    checked4 = 'checked'
                    break;
                case 5:
                    checked5 = 'checked'
                    break;
            }
        }
        cancelRating = 1
    }
    rating = Math.ceil(rating / (cmtBook.length+1)*10)/10
    
    var amount = check != undefined ? check.amount: 1
    if (id != -1) await getBook(id)
    else {
        add = 1
        edit = 1
    }
    image = book.img != undefined ? book.img : "./img/R.png"
    var defSelect = ["", "", "", "", "", "", ""]
    var chooseImg = (edit == 1 || id == -1)
        ? '<input type="file" id="myfile" class="img" name="" accept=".jpg, .png, .jpeg" oninput="preview_image()">'
        : ""
    var allowEdit = (edit == 0 && id != -1)
        ? `disabled` : ""

    var save2 = edit == 0 && admin == 1
        ? `<button class="button-back red" onclick="editInfo(${id})">
        <p>Chỉnh sửa</p>
    </button>`
        : id != -1 && admin == 1
            ? `<button class="button-back red" onclick="saveInfo(${id})">
        <p>Lưu</p>
    </button>`
            : admin == 1
                ? `<button class="button-back red" onclick="addInfo(${id})">
            <p>Thêm</p>
        </button>`
                : `
        <a href="#basket" class="button-back green underlinenone" onclick="">
            Đặt hàng
        </a>`
    var addbas = admin == 0
        ? `<div class="comment">
            <div class="txtCmt" id="basket">
                <h3>Đặt hàng</h3>
            </div>
            <div class="divTitle4">
                <h5 class="amount">Số lượng:</h5>
                <input type="number" min="1" class="text-input4" id="amount" value="${amount}" required>
                <button class="button-back green" onclick="addBasket(${id},${curScreen})">
                    <p>Thêm vào giỏ hàng</p>
                </button>
            </div>
        </div>`
        : `<div></div>`

    var  displayCancelCmt = cancelRating == 0 ?
        `
        <h3>Bình luận</h3>
        <div class="txtCmtDetail">
            <img src="./img/user.png" width=30px class="imgUser"/>
            <div class="txtinfoUser">
                <h4 class="txtnameUser">${curAcc}</h4>
                <input type="text" id="cmtCustomer"  class="text-input5 " required/>
                <div class="positionEnd">
                    <button class="button-back green " onclick="sendCmt(${id})">
                        <p>Bình luận</p>
                    </button>
                </div>
            </div>
        </div>
        `:``
    var comment = admin == 0 || (admin == 1 && edit == 0)
        ? `<div class="comment">
        <div class="txtCmt">
            <h3>Đánh giá</h3>
        </div>
        <div id="${ratingNone}">
            <h2>${rating}/5*</h2>
            <input type="radio" class ="starinput"  id="star5" name="rating" value="5" ${checked5} ${disabledRating}/>
            <label class ="${starLight5}" for="star5"></label>
            <input type="radio" class ="starinput"  id="star4" name="rating" value="4" ${checked4} ${disabledRating}/>
            <label class ="${starLight4}" for="star4"></label>
            <input type="radio" class ="starinput"  id="star3" name="rating" value="3" ${checked3} ${disabledRating}/>
            <label class ="${starLight3}" for="star3"></label>
            <input type="radio" class ="starinput"  id="star2" name="rating" value="2" ${checked2} ${disabledRating}/>
            <label class ="${starLight2}" for="star2"></label>
            <input type="radio" class ="starinput"  id="star1" name="rating" value="1" ${checked1} ${disabledRating}/>
            <label class ="${starLight1}" for="star1"></label>
        </div>
        <div class="txtCmt" >
            ${displayCancelCmt}
        <div class="list" ></div>
        </div>
        <div class="space"></div>
    </div>
    `
        : `<div></div>`
    switch (book.category) {
        case 'Tiểu thuyết, Truyện dài':
            defSelect[0] = 'selected="selected"'
            break;
        case 'Truyện ngắn':
            defSelect[1] = 'selected="selected"'
            break;
        case 'Sách thiếu nhi':
            defSelect[2] = 'selected="selected"'
            break;
        case 'Nhân vật & bài học kinh doanh Kỹ năng sống Tâm lý':
            defSelect[3] = 'selected="selected"'
            break;
        case 'Kinh tế Chứng khoán, Đầu tư, Bất động sản':
            defSelect[4] = 'selected="selected"'
            break;
        case 'Văn học':
            defSelect[5] = 'selected="selected"'
            break;
        case 'Khoa học':
            defSelect[6] = 'selected="selected"'
            break;
    }
    // console.log(defSelect)
    document.querySelector(".container").innerHTML = `
    <div class="main-view">
            <div class="notImg">
                <div class="title-author">
                    <div class="divTitle">
                        <h3>Tiêu đề</h3>
                        <div class="input2 mg-10">
                            <input type="text" id="title"  class="text-input2 " required value="${book.title != undefined ? book.title : ""}" ${allowEdit}> 
                        </div>
                    </div>
                    <div class="divTitle">
                        <h3>Tác giả</h3>
                        <div class="input2">
                            <input type="text" id="auth" class="text-input2" required value="${book.auth != undefined ? book.auth : ""}" ${allowEdit}>
                        </div>
                    </div>
                </div>
                <div class="description">
                    <div class="divTitle">
                        <h3>Mô tả về sách</h3>
                        <div class="input2">
                            <textarea rows="5" cols="60" id="description" class="text-input3" required ${allowEdit}>
                            ${book.description != undefined ? book.description : ""}
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="title-author">
                    <div class="divTitle mg-10">
                        <h3>Ngày phát hành</h3>
                        <div class="input2">
                            <input type="date" id="update_day" class="text-input2" value="${book.update_day != undefined ? book.update_day : ""}" ${allowEdit}>
                        </div>
                    </div>
                    <div class="divTitle">
                        <h3>Số trang</h3>
                        <div class="input2">
                            <input type="text" id="num_of_pages" class="text-input2" required value="${book.num_of_pages != undefined ? book.num_of_pages : ""}" ${allowEdit}>
                        </div>
                    </div>
                </div>
                <div class="title-author">
                    <div class="divTitle">
                        <h3>Thể loại</h3>
                        <select name="cars" id="theloai"  class="catetory" autofocus="${book.category}" ${allowEdit}>
                            <option ${defSelect[0]} value="Tiểu thuyết, Truyện dài">Tiểu thuyết, Truyện dài</option>
                            <option ${defSelect[1]} value="Truyện ngắn">Truyện ngắn</option>
                            <option ${defSelect[2]} value="Sách thiếu nhi">Sách thiếu nhi</option>
                            <option ${defSelect[3]} value="Nhân vật & bài học kinh doanh Kỹ năng sống Tâm lý">Nhân vật & bài học kinh doanh Kỹ năng sống Tâm lý</option>
                            <option ${defSelect[4]} value="Kinh tế Chứng khoán, Đầu tư, Bất động sản">Kinh tế Chứng khoán, Đầu tư, Bất động sản</option>
                            <option ${defSelect[5]} value="Văn học">Văn học</option>
                            <option ${defSelect[6]} value="Khoa học">Khoa học</option>
                          </select>
                    </div>
                </div>
            </div>
            <div class="view-info">
                ${chooseImg}
                <img id="img" src="${image}" alt="" width="450" height="500">
            </div>
        </div>
            ${addbas}
            ${comment}
        <div class="footer">
            <button class="button-back" onclick="goBack(${curScreen})">
                <p>Quay lại</p>
            </button>
            ${save2}
        </div>
    `
    var displayCmt = cmtBook.map(function(item){
        var editCmt = item.id_customer == customer && !editCmtRating ?
        `
        <button class="editCmt" onclick="editCmt(${id})">
            <p>Chỉnh sửa</p>
        </button>
        
        `: ``
        var delCmt = (item.id_customer == customer && !editCmtRating)||admin == 1 ?
        `
        <button class="editCmt red" onclick="removeCmt(${item.id},${id})">
            <p>Xóa</p>
        </button>
        `:``
        if(item.id_customer == customer && editCmtRating){
            return `
            <div class="txtCmtDetail">
                <img src="./img/user.png" width=30px class="imgUser"/>
                <div class="txtinfoUser">
                    <h4 class="txtnameUser">${curAcc}</h4>
                    <input type="text" id="cmtCustomer"  class="text-input5 " value="${item.cmt}" required/>
                    <div class="positionEnd">
                        <button class="button-back green " onclick="sendCmt(${id},${item.id})">
                            <p>Bình luận</p>
                        </button>
                    </div>
                </div>
            </div>
            `
        }else{
            return `
            <div class="txtCmtDetail2">
                <img src="./img/user.png" width=30px class="imgUser"/>
                <div class="txtinfoUser">
                    <div class="txtStarCustomer">
                        <h4 class="txtnameUser">${item.name}</h4>
                        <h4>${item.star}/5*</h4>
                        ${editCmt}
                        ${delCmt}
                    </div>
                    <input type="text" id="title"  class="text-input5" value="${item.cmt}" required disabled/>
                </div>
            </div>
            `
        }
    })
    document.querySelector('.list').innerHTML = displayCmt.join('')
}

async function removeCmt(id,idBook) {
    var htmls = `
            <div class="comfirm">
                <p class="text-comfirm-del">Bạn có chắc chắn muốn xóa bình luận không?</p>
                <div class="main-confirm">
                    <button class="btncf" onclick="delCmt(${id},${idBook})">Xóa</button>
                    <button class="btncf" onclick="noCmt(${idBook})">Hủy</button>
                </div>
                
            </div>
        `
    document.querySelector(".container").innerHTML = htmls

}

async function editCmt(id){
    var editCmtRating =true
    await handleEditItem(id,1,editCmtRating)
}

async function delCmt(id,idBook){
    alert("Xóa thành công bình luận")
    await delItemCmt(id)
    await handleEditItem(idBook)
}

async function noCmt(idBook){
    await handleEditItem(idBook)
}

async function addBasket(idBook, curScreen) {
    // console.log("idid",idBook)
    var amount = document.getElementById('amount').value
    // console.log("amount", isNaN(Number(amount)))
    if (amount.replace(/\s/g, '') == '') {
        alert("Bạn cần nhập số lượng cụ thể")
        return;
    } else if (isNaN(Number(amount))) {
        alert("Bạn cần nhập kiểu số")
        return;
    } else if (Number(amount) <= 0) {
        alert("Bạn cần nhập số lượng ít nhất là 1")
        return;
    }
    var check = listContainer.find(function(item){
        return item.idd_book == idBook
    })
    // console.log("check",check)
    var formData = check != undefined ? {
        id: check.id,
        idd_customer: customer,
        idd_book: idBook,
        amount: amount
    }:{
        idd_customer: customer,
        idd_book: idBook,
        amount: amount
    }
    await postBasket(formData)
    alert("Đặt hàng thành công, hãy tiếp tục xem các mặt hàng khác")
    window.location.href='index.html'

}

async function dangki() {
    document.querySelector(".container").innerHTML = `
        <form action="#" class="info">
            <li class="input">
                <input type="text" class="text-input"  id="name" required placeholder="Tên người dùng">
            </li>
            <li class="input">
                <input type="email" class="text-input"  id="acc" required placeholder="Tài khoản">
            </li>
            <li class="input">
                <input type="password" class="text-input" id="pass" required placeholder="Mật khẩu">
            </li>
            <li class="input">
                <input type="password" class="text-input" id="repeatPass" required 
                    oninvalid="setCustomValidity('Your passwords do not match');" 
                    placeholder="Nhập lại mật khẩu">
            </li>
            <li class="button-login-parent">
                <button class="button-login-child" onclick="register()">
                    <p class="text-button-login">Đăng kí</p>
                </button>
                <button class="button-login-child" onclick="goBack()">
                    <p class="text-button-login">Quay lại</p>
                </button>
            </li>
        </form>
    `
}

async function sendCmt(idBook,edit=-1){
    let checked = -1
    for (let i=5;i>0;i--){
        if(document.getElementById(`star${i}`).checked == true){
            checked=i
            // console.log("checked",checked)
            break;
        }
    }
    let cmt =  document.getElementById("cmtCustomer").value
    // console.log("cmt",cmt)
    if(checked<1){
        alert("Bạn cần đánh giá sao trước khi bình luận!")
        return;
    }
    if (cmt.replace(/\s/g, '') == '') {
        document.getElementById("cmtCustomer").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.getElementById("cmtCustomer").style.borderColor = "#cacaca"
    }
    var formData = edit<1 ?{
        id_customer: customer,
        id_book: idBook,
        cmt: cmt,
        star: checked
    }:{
        id: edit,
        id_customer: customer,
        id_book: idBook,
        cmt: cmt,
        star: checked
    }
    await sendCmtToDB(formData)
    alert("Bình luận thành công")
    await getComment(handleEditItem(idBook))
}

async function goBack(curScreen = 1) {
    if (curScreen == 1){
        // await getList(renderItem)
        window.location.href='index.html'
    }else{
        await container()
    }
}

async function addInfo() {
    var title = document.getElementById("title").value
    var auth = document.getElementById("auth").value
    var description = document.getElementById("description").value
    var update_day = document.getElementById("update_day").value
    var num_of_pages = document.getElementById("num_of_pages").value
    var category = document.getElementById("theloai").value
    document.getElementById("title").style.borderColor = "#cacaca"
    document.getElementById("auth").style.borderColor = "#cacaca"
    document.getElementById("update_day").style.borderColor = "#cacaca"
    document.getElementById("num_of_pages").style.borderColor = "#cacaca"
    if (title.replace(/\s/g, '') == '') {
        document.getElementById("title").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.getElementById("title").style.borderColor = "#cacaca"
    }
    if (auth.replace(/\s/g, '') == '') {
        document.getElementById("auth").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.getElementById("auth").style.borderColor = "#cacaca"
    }
    if (update_day.replace(/\s/g, '') == '') {
        document.getElementById("update_day").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.getElementById("update_day").style.borderColor = "#cacaca"
    }
    if (num_of_pages.replace(/\s/g, '') == '') {
        document.getElementById("num_of_pages").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.getElementById("num_of_pages").style.borderColor = "#cacaca"
    }
    if (isNaN(num_of_pages)) {
        document.getElementById("num_of_pages").style.borderColor = "red"
        alert("Kiểu dữ liệu phải là số nguyên")
        return;
    } else {
        document.getElementById("num_of_pages").style.borderColor = "#cacaca"
    }

    var formData = {
        title: title,
        auth: auth,
        description: description,
        update_day: update_day,
        num_of_pages: num_of_pages,
        category: category,
        img: image
    }
    // console.log("formData", formData)
    await addBookDb(formData)
    alert("Thêm sách thành công")
    await getList(renderItem)
}

async function register() {
    var name = document.getElementById('name').value
    var acc = document.getElementById('acc').value
    var pass = document.getElementById('pass').value
    var repeatPass = document.getElementById('repeatPass').value
    document.querySelector("#name").style.borderColor = "#cacaca"
    document.querySelector("#acc").style.borderColor = "#cacaca"
    document.querySelector("#pass").style.borderColor = "#cacaca"
    document.querySelector("#repeatPass").style.borderColor = "#cacaca"
    if (name.replace(/\s/g, '') == '') {
        document.querySelector("#name").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.querySelector("#acc").style.borderColor = "#cacaca"
    }
    // console.log("validateEmail(acc)",validateEmail(acc))
    if (acc.replace(/\s/g, '') == '' || !validateEmail(acc)) {
        document.querySelector("#acc").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.querySelector("#acc").style.borderColor = "#cacaca"
    }
    if (pass.replace(/\s/g, '') == '') {
        document.querySelector("#pass").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.querySelector("#pass").style.borderColor = "#cacaca"
    }
    if (repeatPass.replace(/\s/g, '') == '') {
        document.querySelector("#repeatPass").style.borderColor = "red"
        alert("Không được bỏ trống")
        return;
    } else {
        document.querySelector("#repeatPass").style.borderColor = "#cacaca"
    }
    if (pass != repeatPass) {
        document.querySelector("#repeatPass").style.borderColor = "red"
        alert("Mật khẩu nhập lại không trùng mật khẩu đã nhập")
        return;
    } else {
        document.querySelector("#repeatPass").style.borderColor = "#cacaca"
    }

    for (let item of listAuth) {
        // console.log("item", item)
        if (item.account == acc) {
            alert("Email đã tồn tại")
            dangki()
            return;
        } else {
            document.querySelector("#acc").style.borderColor = "#cacaca"
        }
    }
    var formData = {
        name: name,
        account: acc,
        passwd: pass,
        is_connect: '1'
    }
    alert("Tạo tài khoản thành công")
    await insertAcc(formData)
    await start()
}

async function signIn() {
    var acc = document.getElementById('acc').value
    var pass = document.getElementById('password').value
    document.querySelector("#acc").style.borderColor = "#cacaca"
    document.querySelector("#password").style.borderColor = "#cacaca"
    if (acc.replace(/\s/g, '') == '' || !validateEmail(acc)) {
        document.querySelector("#acc").style.borderColor = "red"
        return;
    } else {
        document.querySelector("#acc").style.borderColor = "#cacaca"
    }
    if (pass.replace(/\s/g, '') == '') {
        document.querySelector("#password").style.borderColor = "red"
        return;
    } else {
        document.querySelector("#password").style.borderColor = "#cacaca"
    }
    var res = checkAuth(acc, pass)
    // console.log("listAuth",listAuth)
    if (res != false) {
        var formData = {
            id: infoAcc.id,
            name: infoAcc.name,
            account: infoAcc.account,
            passwd: infoAcc.passwd,
            is_connect: '1'
        }
        await saveAccDB(formData)
        console.log("Dang nhap thanh cong")
        await start()
    } else {
        console.log("Dang nhap that bai")
        alert("Sai mật khẩu hoặc tài khoản")
        await dangnhap()
        document.querySelector("#password").style.borderColor = "red"
    }
}

async function saveInfo(id) {
    var title = document.getElementById("title").value
    var auth = document.getElementById("auth").value
    var description = document.getElementById("description").value
    var update_day = document.getElementById("update_day").value
    var num_of_pages = document.getElementById("num_of_pages").value
    var category = document.getElementById("theloai").value
    document.getElementById("title").style.borderColor = "#cacaca"
    document.getElementById("auth").style.borderColor = "#cacaca"
    document.getElementById("update_day").style.borderColor = "#cacaca"
    document.getElementById("num_of_pages").style.borderColor = "#cacaca"
    if (title.replace(/\s/g, '') == '') {
        document.getElementById("title").style.borderColor = "red"
        return;
    } else {
        document.getElementById("title").style.borderColor = "#cacaca"
    }
    if (auth.replace(/\s/g, '') == '') {
        document.getElementById("auth").style.borderColor = "red"
        return;
    } else {
        document.getElementById("auth").style.borderColor = "#cacaca"
    }
    if (update_day.replace(/\s/g, '') == '') {
        document.getElementById("update_day").style.borderColor = "red"
        return;
    } else {
        document.getElementById("update_day").style.borderColor = "#cacaca"
    }
    if (num_of_pages.replace(/\s/g, '') == '') {
        document.getElementById("num_of_pages").style.borderColor = "red"
        return;
    } else {
        document.getElementById("num_of_pages").style.borderColor = "#cacaca"
    }
    var formData = {
        id: id,
        title: title,
        auth: auth,
        description: description,
        update_day: update_day,
        num_of_pages: num_of_pages,
        category: category,
        img: image
    }
    // console.log("formData", formData)
    await saveDB(formData)
    edit = 0
    alert("Chỉnh sửa thành công")
    handleEditItem(id)
}

function checkAuth(acc, pass) {
    for (let i of listAuth) {
        if (i.account == acc && i.passwd == pass) {
            infoAcc = i
            // console.log("infoAcc", infoAcc)
            return i
        }
    }
    return false
}

function editInfo(id) {
    edit = 1
    handleEditItem(id)
}

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

async function dangxuat() {
    var formData = {
        id: infoAcc.id,
        name: infoAcc.name,
        account: infoAcc.account,
        passwd: infoAcc.passwd,
        is_connect: '0'
    }
    await saveAccDB(formData)
    await start()
}

async function preview_image() {
    const file = document.querySelector('#myfile');
    const res = await image_to_base64(file.files[0])
    if (res) {
        // const resized = await reduce_image_file_size(res);
        document.getElementById("img").src = res;
        image = res
    } else {
        console.log('return err')
    }
}

async function getAuth(callback) {
    await fetch(API + '/signin')
        .then((response) => response.json())
        .then((data) => listAuth = data)
        .then(callback);
}

async function getList(callback) {
    await fetch(API + `/list`)
        .then((response) => response.json())
        .then((data) => listBook = data)
        .then(callback);
}

async function getBook(id, callback) {
    await fetch(API + `/book/${id}`)
        .then((response) => response.json())
        .then((data) => book = data)
        .then(callback);
}

async function getContainer(callback) {
    await fetch(API + `/listContainer`)
        .then((response) => response.json())
        .then((data) => listContainer = data)
        .then(callback);
}

async function getComment(callback) {
    await fetch(API + `/listComment`)
        .then((response) => response.json())
        .then((data) => listComment = data)
        .then(callback);
}

async function delItemCmt(id, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    await fetch(API + `/delete/itemCmt/${id}`, options)
        .then((response) => response.json)
        .then(callback);
}

async function saveAccDB(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/update/account`, options)
        .then((response) => response)
}

async function delItemContainer(id, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    await fetch(API + `/delete/itemContainer/${id}`, options)
        .then((response) => response.json)
        .then(callback);
}

async function delBook(id, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    await fetch(API + `/delete/elementlist/${id}`, options)
        .then((response) => response.json)
        .then(callback);
}

async function postBasket(data){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/updateItemContainer`, options)
        .then((response) => response)
}

async function saveDB(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/update/book`, options)
        .then((response) => response)
}

async function insertAcc(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/register`, options)
        .then((response) => response)
}

async function sendCmtToDB(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/updateItemCmt`, options)
        .then((response) => response)
        .then(callback);
}

async function addBookDb(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch(API + `/addlist`, options)
        .then((response) => response)
}

async function image_to_base64(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
            console.log(error)
            alert('An Error occurred please try again, File might be corrupt');
        };
        fileReader.readAsDataURL(file);
    });
    console.log("result_base64", result_base64)
    return result_base64;
}

// async function reduce_image_file_size(base64Str, MAX_WIDTH = 70, MAX_HEIGHT = 70) {
//     let resized_base64 = await new Promise((resolve) => {
//         let img = new Image()
//         img.src = base64Str
//         img.onload = () => {
//             let canvas = document.createElement('canvas')
//             let width = MAX_WIDTH
//             let height = MAX_HEIGHT
//             canvas.width = width
//             canvas.height = height
//             let ctx = canvas.getContext('2d')
//             ctx.drawImage(img, 0, 0, width, height)
//             resolve(canvas.toDataURL())
//         }
//     });
//     return resized_base64;
// }