function Staff(tknv, name, email, password, datepicker, luongCB, chucvu, giolam, tongluong ,xeploai) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.giolam = giolam;
    this.tongluong = function(){
      var salary = this.luongCB 
      if (chucvu ==="Sếp"){
        return salary*3
        
      } else if(chucvu ==="Trưởng phòng"){
       
        return salary*2;
        
      } else if (chucvu==="Nhân viên"){
        return salary
      }
      
    };

    
    this.xeploai = function(){
      var rank=""
      if (giolam>=192){
        
       return rank+= "Xuất sắc" 
      }else if (giolam>=176){
        
        return rank+= "Giỏi"
      }else if (giolam>=160){
       
        return  rank+= "Khá"
      }else if(giolam<160){
        return rank+= "TB"
       

      }

    }
  
    
  }
  