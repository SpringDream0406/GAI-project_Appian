import React from 'react'
import './Header.css'


import './Main.css';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide from './Slide';
import { getResizeEventListener } from './utils';
import { id } from 'date-fns/locale';



const Mainpage = () => {


  

  useEffect(() => {
    // 리사이즈 이벤트가 발생할 때마다 화면 크기에 따라 요소들을 조정하는 이벤트 리스너 추가
    const resizeEventListener = getResizeEventListener(1920, 1080);
    window.addEventListener('resize', resizeEventListener);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', resizeEventListener);
    };
  }, []);


  // 이미지 슬라이더 
  const myRef = React.createRef();



  const [showBanner, setShowBanner] = useState(false);
  // showBanner라는 상태 변수를 선언 , 초기값으로 'false'를 설정 => 플로팅 배너의 보이기/숨기기 여부를 제어할 때 사용 

  useEffect(() => {


    const handleScroll = () => { // 스크롤 이벤트를 처리하는 함수
      // 스크롤 위치가 300px 이상이면 배너를 보여줌
      setShowBanner(window.scrollY >= 0); //0이상이면 true가 되도록,
    };

    window.addEventListener('scroll', handleScroll); 
    //handleScroll 함수를 스크롤 이벤트에 연결

    // cleanup 함수
    return () => {
      window.removeEventListener('scroll', handleScroll); 
      //컴포넌트가 언마운트 될때 handleScroll 함수를 스크롤 이벤트에 연결 해제

    };
  }, []);


  // 스크롤이 내려갔을대 메인버튼이 움직이도록 구현되게 하는 코드

  const [animate, setAnimate] = useState(false);


  const animationTriggerPosition = 500; // 스크롤이 이 위치보다 아래로 내려갔을 때 애니메이션 실행



  const handleScroll = () => {
    if (window.scrollY > animationTriggerPosition) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  };

  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


//마우스 오버시에 머신러닝 



  return (

  <div>
    
  
    

    {/* 메인 배경이미지 */}
    <img src='/img/mainImage.png' id="main-image"/ >
 
    <div id='main-container'>
           <Slide />

          {/* 플로팅 배너 */}
          <div className={`floating-banner ${showBanner ? 'show' : ''}`}>
            {/* showBanner 변수의 값에 따라 플로팅 배너에 show 클래스를 추가하거나 제거 */}
            {/* 배너 내용 */}
            <Link to='/machin' className='MACHINBANNER' >
                <img src='/img/main_banner.png' alt="banner"  className='machinBanner'/ >
            
                <span className='machin_text1' >
                  <span>내 작물가격 </span>
                  <br/>
                  <span style={{paddingLeft :'190px'}}>알아보기</span>
                  </span>
              
            </Link>
          </div>
           
          
          
            <div >
                <div  id='mainTitle'  >
                  <span>소중한 땅 한조각</span>
                  <br/>
                  <span>행복을 키우는</span>
                  <br/>
                  <span className='mainTitle_1'>팜팜을 만나보세요!</span>
                </div>

                <div  id='sub' >
                  <span>텃밭을 나누고 받으며, 자연과 소통하는 특별한 공간을 경험해보세요.</span>
                    <br/>
                  <span>지금 내 텃밭을 내놓거나 특별한 나만의 공간을 구해보세요!</span>
                </div>
            </div>
            

            <div id='MAINTITLE2'>
              <div id='mainTitle2'>
                <span>팜팜탐험</span>
              </div>
                <span className='sub2'>작은 행복과 자연의 만남을 기다려요~</span>

                <div className='brocol'>
                  <img src="/img/brocol.png"/>
                </div>
            </div>
            


            

              

            
            <span className='mainTitle3'>텃밭소식</span>
            <br/>
            <span className='sub3'>지금 바로 나만의 텃밭을 만나보세요!</span>

        
            <div  id="MAINBUTTON"
                  className={animate ? 'animate' : ''}>
                 
                 <div className='mainbutton1'>
            
                        <img src="/img/mainbutton1.png"/>
                 </div>
                 <div className='mainbutton2'>
                    <img src="/img/mainbutton2.png"/>
                  </div> 
               
               <div className='findbtn'>
                   <Link to='/find/' className='findname'>
                         <span>바로가기→</span>
                   </Link>
               </div> 
                       
                  {/* mainbutton1에 버튼으로 사용할 것 만들기 */}
                  
                    
                  
     
                    <div className='findbtn2'>
                       <Link to='/out' className='findname2'>
                         <span >바로가기→</span>
                       </Link>
                    </div>
                    
                   
                    </div>

            


            

            

            
      
    </div>

    
    </div>
  )
  
  }

export default Mainpage