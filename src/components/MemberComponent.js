import React, { Component } from 'react';

class MemberComponent extends Component {

    constructor(props){
        super(props);
        this.state= {
            companyNum: '',
            companySign: '',
            companyUnitSign: '',
            companyNumCheckOrNot: false,
            
            id: '',
            password: '',
            passwordCfm: '',

            pwdQuestion: '',
            pwdQuestionResponse: '',
            // 비밀번호 분실 시 확인 질문 직접 입력 인풋
            // pwdQuestion의 value값이 '직접입력'일때 열리도록 한다
            // isInputOpen true이면 인풋 오픈 false이면 인풋 클로즈
            isInputOpen: false,

            // 아이디, 비밀번호 형식 인포 텍스트를 위한 state
            isAddInfoTextId: false,
            isAddInfoTextPwd: false,
            isAddInfoTextPwdCfm: false,

            phoneNum: '',
            faxNum: '',
            companyManager: '',
            
            emailAddr: '',
            email1: '',
            email2: '',
            // email2 인풋 비활성화를 위한 변수
            isEmail2ReadOnly: false,

            homePage: '',

            msgCheck: ''
            
        }
        this.onChangePwdQuestion = this.onChangePwdQuestion.bind(this);
    }


    onChangeCompanyNum = (e) => {this.setState({companyNum: e.target.value});}
    onChangeCompanyUnitSign = (e) => { this.setState({companyUnitSign: e.target.value});}
    // 사업장관리번호 확인 버튼 이벤트
    // 사업장관리번호 확인 버튼 클릭시 companyNum 벨류 값이 companySign에 들어가도록 
    // 그리고 사업자 기호 인풋에 벨류 값이 보이도록 해야한다.
    // 사업자 기호 인풋은 입력이 불가한 비활성화 상태
    onClickCompanyNumCheck = (e) => {
        e.preventDefault();
        if(this.state.companyNum === ''){
            alert('사업장관리번호를 입력하세요.');
        }
        this.setState({
            companySign:this.state.companyNum,
            companyNumCheckOrNot: true
        });
    }

    // 사업장관리번호 확인하지 않고 다른 인풋들 입력하려고 할때 경고안내 alert 띄우는 메소드
    // onInputAnnounceAlert = (e) => {
    //     e.preventDefault();
    //     this.setState({id:''});
    //     if(this.state.companyNumCheckOrNot === false){
    //         alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
    //         return;
    //     }
    // }



    // 아이디 입력
    // 영문 + 숫자 6~10자 이내 조건 충족하도록 한다 
    // 이를 충족하지 않을시 인풋 밑에 '아이디 형식을 확인해주세요'가 뜨도록 한다
    onChangeId = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({id: e.target.value});
            if(/^(?=.*[a-zA-Z])+(?=.*[0-9])+.{6,10}$/g.test(e.target.value)){ 
                this.setState({
                    id: e.target.value,
                    isAddInfoTextId: false
                });
            } else {
                this.setState({isAddInfoTextId: true});
            }
        } 
        
    }

    // 비밀번호 입력   
    onChangePassword = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({password: e.target.value});
            if(/^(?=.*[a-zA-Z])+(?=.*[0-9])+(?=.*[\!\@\#\$])+.{9,12}$/g.test(e.target.value)){
                this.setState({
                    password: e.target.value,
                    isAddInfoTextPwd: false
                });
            } else {
                this.setState({isAddInfoTextPwd: true});
            }
        }
    }

    // 비밀번호 확인 입력
    onChangePasswordCfm = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({passwordCfm: e.target.value});
            if(this.state.password === e.target.value){  // 비밀번호와 같으면 
                this.setState({
                    passwordCfm: e.target.value,
                    isAddInfoTextPwdCfm: false
                });
            } else {
                this.setState({isAddInfoTextPwdCfm: true});
            }
        }
    }


    // 비밀번호 분실시 확인 질문 셀렉트
    onChangePwdQuestion = (value) => {
        this.setState({
            pwdQuestion: value,
            isInputOpen: false
        });

        if(value === '직접입력') {
            // 직접입력일땐 인풋에 직접 입력된 값을 가져와서 넣어줘야 한다. 
            this.onChangePwdQInput();
        }

        console.log('pwdQuestion : ', this.state.pwdQuestion);
    }

    // 비밀번호 분실시 확인 질문 직접입력 인풋 생성 메소드
    onChangePwdQInput = () => {
        this.setState({
            isInputOpen: true,
        });
    }

    // 비밀번호 분실시 확인 질문 직접입력 입력 상태관리
    onChangePwdQuestionInput = (e) => {
        this.setState({pwdQuestion:e.target.value});
    }

    // 비밀번호 분실시 확인 답변 입력
    onChangePwdQuestionResponse = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({pwdQuestionResponse: e.target.value});
        }
    }


    // 전화번호 입력
    onChangePhoneNum = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({phoneNum: e.target.value});
        }
    }

    // 팩스번호 입력
    onChangeFaxNum = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({faxNum: e.target.value});
        }
    }

    // 업무담당자명 입력
    onChangeCompanyManager = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({companyManager: e.target.value});
        }
    } 

    // 이메일 주소 앞 부분 입력
    onChangeEmail1 = (e) => {
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({email1: e.target.value});
        }
    }

    // 이메일 주소 뒷 부분 직접 입력
    onChangeEmail2 = (e) => {
        e.preventDefault();
        if(this.state.companyNumCheckOrNot === false){
            alert('사업장관리번호확인 버튼을 클릭하여 사업장관리번호 검증을 수행하십시오.');
            return;
        } else {
            this.setState({email2: e.target.value});
        }
    }
    // 이메일 주소 뒷 부분 select
    onChangeEmailAddr2 = (e) => {
        e.preventDefault();
        if(e.target.value === '직접입력'){
            // 인풋 활성화 하고 입력하도록 한다
            this.setState({
                email2:'',
                isEmail2ReadOnly: false
            });
        } else if(e.target.value === '네이버') {
            // 정해진 데이터가 인풋에 들어가도록 하고 인풋은 비활성화한다
            this.setState({
                email2:'naver.com',
                isEmail2ReadOnly: true
            });
        } else if(e.target.value === '네이트') {
            this.setState({
                email2:'nate.com',
                isEmail2ReadOnly: true
            });
        } else if(e.target.value === '다음(한메일)') {
            this.setState({
                email2:'daum.net',
                isEmail2ReadOnly: true
            });
        } else if(e.target.value === '야후') {
            this.setState({
                email2:'yahoo.com',
                isEmail2ReadOnly: true
            });
        } else if(e.target.value === '한메일(MSN)') {
            this.setState({
                email2:'hanmail.net',
                isEmail2ReadOnly: true
            });
        } else if(e.target.value === 'Gmail') {
            this.setState({
                email2:'gmail.com',
                isEmail2ReadOnly: true
            });
        }

    }

    // 홈페이지 주소 입력
    onChangeHomePage = (e) => {
        this.setState({homePage: e.target.value});
    }



    // 메세지 수신여부 라디오 버튼 (value는 msgYes 또는 msgNo)
    onChangeMsgCheck = (value) => {
        this.setState({msgCheck : value});
        console.log(this.state.msgCheck);
    }



    // 페이지 가장 하단=======================================================================
    // 폼 전송 -> 가입 정보 저장
    onSubmitFn = (e) => {
        e.preventDefault();

        const inputObj = {
            companyNum: this.state.companyNum,
            companySign: this.state.companySign,
            companyUnitSign: this.state.companyUnitSign,
            id: this.state.id,
            password: this.state.password,
            passwordCfm: this.state.passwordCfm,
            pwdQuestion: this.state.pwdQuestion,
            pwdQuestionResponse: this.state.pwdQuestionResponse,
            phoneNum: this.state.phoneNum,
            faxNum: this.state.faxNum,
            companyManager: this.state.companyManager,
            email1: this.state.email1,
            email2: this.state.email2,
            emailAddr: `${this.state.email1}@${this.state.email2}`,
            homePage: this.state.homePage,
            msgCheck: this.state.msgCheck
        }
        localStorage.setItem(inputObj.id, JSON.stringify(inputObj));
    }

    // 취소 버튼 
    onClickCancleBtn = (e) => {
        e.preventDefault();
        alert('회원가입을 취소하시겠습니까? 취소하시면 입력내용은 삭제됩니다.');
        window.location.replace('/main')
    }

    

    render() {
        return (
            <div id="signup-form"> 
                <div id='page-title-box'>
                    <span>회원가입</span>
                </div>

                <div id='info-bar-box'>
                    <ul>
                        <li><strong>01</strong><span>약관동의</span></li>
                        <li className='curr'>
                            <strong>02</strong>
                            <span>가입정보입력</span>
                        </li>
                        <li><strong>03</strong><span>가입완료</span></li>
                    </ul>
                </div>

                <div id='info-text-box'>
                    <p>개인(직장가입자)이 아닌 <span>사업장업무를 위한 회원가입</span>입니다</p>
                    <p>사업장관리번호 및 단위 사업장 기호가 다른 경우에는 각각 회원가입을 하셔야 합니다.</p>
                    <p>예)건설현장 사업장마다 사업장관리번호가 각각 적용되오니 회원가입도 각각 하셔야 해당 업무를 이용하실 수 있습니다.</p>
                </div>

                <div id='form-box'>
                    <div className='top-comment'><p>표는 필수 입력 사항이며, [동일아이디검색] 및 [가입여부확인] 버튼을 반드시 눌러주세요.</p></div>
                    <form onSubmit={(e) => this.onSubmitFn(e)}>
                        <ul>
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>사업장관리번호</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        className='input-style small-input' 
                                        onChange={this.onChangeCompanyNum} 
                                        value={this.state.companyNum} 
                                    />
                                    <button 
                                        className='signup-btn company-num'
                                        onClick={this.onClickCompanyNumCheck}
                                    >사업장관리번호 확인</button>
                                    <button className='signup-btn company-num-cfm'>사업장 관리번호 확인방법</button>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>사업장기호</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        className='input-style big-input' 
                                        value={this.state.companySign} 
                                        readOnly
                                        onInput={this.onInputAnnounceAlert}
                                        placeholder='사업장관리번호확인 버튼을 클릭하여 검증하시면 자동입력 됩니다.' 
                                    />
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>단위사업장기호</span>
                                </div>
                                <div className='right'>
                                    <button className='signup-btn'>단위사업장검색</button>
                                    <input 
                                        type="text" 
                                        className='input-style small-input gray-input' 
                                        onChange={this.onChangeCompanyUnitSign} 
                                        value={this.state.companyUnitSign} 
                                    />
                                    <button className='signup-btn'>가입여부 확인하기(실명확인)</button>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>아이디</span>
                                </div>
                                <div className='right right-box'>
                                    <input 
                                        type="text" 
                                        className='input-style small-input' 
                                        onChange={this.onChangeId} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.id} 
                                        placeholder='영문+숫자 6~10자 이내' 
                                    />
                                    <button className='signup-btn'>아이디 중복검색</button>
                                    <div className='info-text-box'>
                                        <p className=
                                            {
                                                (
                                                    this.state.isAddInfoTextId ? 
                                                    'add-info-text' : 'delete-info-text'
                                                    // isAddInfoText가 false이면 인포 텍스트를 보이지 않는것 즉, 형식에 맞게 썻다는 뜻 
                                                    // isAddInfoText가 true이면 인포 텍스트를 보여줘야 하는것 즉, 형식에 맞지 않게 썻다는 뜻
                                                )
                                            }
                                        >X 아이디는 영문과 숫자를 조합하여 6~10자 이내로 입력해주세요.</p>
                                    </div>
                                </div>
                                
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>비밀번호</span>
                                </div>
                                <div className='right right-box'>
                                    <input 
                                        type="password" 
                                        className='input-style large-input' 
                                        onChange={this.onChangePassword} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.password} 
                                        placeholder='영문+숫자+특수문자(!@#$) 각 1자 이상 포함하여 9~12자 이내' 
                                    />
                                    <div className='info-text-box'>
                                        <p className=
                                        {
                                            (
                                                this.state.isAddInfoTextPwd ? 
                                                'add-info-text' : 'delete-info-text'
                                            )
                                        }
                                        >X 영문+숫자+특수문자(!@#$) 각 1자 이상 포함하여 9~12자 이내로 입력해주세요.</p>
                                    </div>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>비밀번호확인</span>
                                </div>
                                <div className='right right-box'>
                                    <input 
                                        type="password" 
                                        className='input-style large-input' 
                                        onChange={this.onChangePasswordCfm} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.passwordCfm} 
                                        placeholder='영문+숫자+특수문자(!@#$) 각 1자 이상 포함하여 9~12자 이내' 
                                    />
                                    <div className='info-text-box'>
                                        <p className=
                                        {
                                            (
                                                this.state.isAddInfoTextPwdCfm ? 
                                                'add-info-text' : 'delete-info-text'
                                            )
                                        }
                                        >X 비밀번호가 일치하지 않습니다.</p>
                                    </div>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot pwd-span'>비밀번호 분실 시 확인 질문</span>
                                </div>
                                <div className='right'>
                                    <div className='pwd-search-question'>
                                        <select 
                                            className='pwd-search-question-select' 
                                            name='pwd-search-question' 
                                            onChange={(e) => this.onChangePwdQuestion(e.target.value)} 
                                            defaultValue='질문을 선택하세요'
                                        >
                                            <option value='질문을선택하세요'>질문을 선택하세요</option>
                                            <option value='나의아버지성함은?'>나의 아버지 성함은?</option>
                                            <option value='나의그리운고향은?'>나의 그리운 고향은?</option>
                                            <option value='나의첫째아이이름은?'>나의 첫째아이 이름은?</option>
                                            <option value='나의초등학교이름은?'>나의 초등학교 이름은?</option>
                                            <option value='나의보물제1호는?'>나의 보물 제1호는?</option>
                                            <option value='기억에남는추억의장소는?'>기억에 남는 추억의 장소는?</option>
                                            <option value='나의인생좌우명은?'>나의 인생 좌우명은?</option>
                                            <option value='내가좋아하는캐릭터는?'>내가 좋아하는 캐릭터는?</option>
                                            <option value='추억하고싶은날짜가있다면?'>추억하고 싶은 날짜가 있다면?</option>
                                            <option value='인상깊게읽은책이름은?'>인상 깊게 읽은 책 이름은?</option>
                                            <option value='내가가장존경하는인물은?'>내가 가장 존경하는 인물은?</option>
                                            <option value='가장기억에남선생님성함은?'>가장 기억에 남는 선생님 성함은?</option>
                                            <option value='내가받았던선물중기억에남는선물은?'>내가 받았던 선물 중 기억에 남는 선물은?</option>
                                            <option value='직접입력'>직접입력</option>
                                        </select>

                                        {/* 이 인풋 박스는 상단 셀렉트 박스에서 '직접입력' 선택시에 보여지도록 한다  */}
                                        {
                                            this.state.isInputOpen && (
                                                <input 
                                                    type='text' 
                                                    className='input-style pwd-search-question-input' 
                                                    onChange={(e) => this.onChangePwdQuestionInput(e)}
                                                    autoFocus
                                                    maxLength='20'
                                                    placeholder='질문을 직접 입력해주세요. 조회질문을 20자이내 (공란포함)입니다.' 
                                                /> 
                                            )
                                        }
                                       
                                    </div>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot pwd-span'>비밀번호 분실 시  확인 답변</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type='text' 
                                        className='input-style large-input' 
                                        onChange={this.onChangePwdQuestionResponse} 
                                        value={this.state.pwdQuestionResponse} 
                                        maxLength='10'
                                        placeholder='조회 답변은 띄어쓰기 포함 10자 이내' 
                                    />
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>전화번호</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        className='input-style medium-input' 
                                        onChange={this.onChangePhoneNum} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.phoneNum}
                                        maxLength='11'
                                        placeholder='"-(하이픈)"없이 입력(예:01012345678)' 
                                    />
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span>팩스번호</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type="text" 
                                        className='input-style medium-input white-input' 
                                        onChange={this.onChangeFaxNum} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.faxNum}
                                        maxLength='11'
                                        placeholder='"-(하이픈)"없이 입력(예:01012345678)' 
                                    />
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>업무담당자명</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type='text' 
                                        className='input-style large-input' 
                                        onChange={this.onChangeCompanyManager} 
                                        onInput={this.onInputAnnounceAlert}
                                        value={this.state.companyManager}
                                        placeholder='사업장의 소속된 직장 가입자 직원 또는 대표자' 
                                    />
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span className='red-dot'>이메일</span>
                                </div>
                                <div className='right'>
                                    <input 
                                        type='text' 
                                        className='input-style small-input' 
                                        onChange={this.onChangeEmail1}
                                        value={this.state.email1}
                                    />
                                    <span>@</span>
                                    {
                                        // 자동입력인 경우
                                        this.state.isEmail2ReadOnly && (
                                        <input 
                                            type='text' 
                                            className='input-style small-input gray-input' 
                                            onChange={this.onChangeEmail2}
                                            value={this.state.email2}
                                            readOnly
                                        />
                                        )
                                    }
                                    {
                                        // 직접입력인 경우
                                        !this.state.isEmail2ReadOnly && (
                                        <input 
                                            type='text' 
                                            className='input-style small-input' 
                                            onChange={this.onChangeEmail2}
                                            value={this.state.email2}
                                            autoFocus
                                        />
                                        )
                                    }
                                    
                                    <select 
                                        name='email-addr2' 
                                        onChange={this.onChangeEmailAddr2} 
                                        className='email-addr-select'

                                    >
                                        <option value='직접입력'>직접입력</option>
                                        <option value='네이버'>네이버</option>
                                        <option value='네이트'>네이트</option>
                                        <option value='다음(한메일)'>다음(한메일)</option>
                                        <option value='야후'>야후</option>
                                        <option value='한메일(MSN)'>한메일(MSN)</option>
                                        <option value='Gmail'>Gmail</option>
                                    </select>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span>홈페이지주소</span>
                                </div>
                                <div className='right'>
                                    <p>
                                        <span>http://</span>
                                        <input 
                                            type="text" 
                                            className='input-style home-page-input' 
                                            onChange={this.onChangeHomePage} 
                                            value={this.state.homePage}
                                        />
                                    </p>
                                </div>
                            </li> 
                            <li>
                                <div className='left'>
                                    <span>소식지 수신여부</span>
                                </div>
                                <div className='right'>
                                    <div className='msg-check'>
                                        <span>
                                            <input 
                                                type='radio' 
                                                id='receiveMsg' 
                                                name='msgCheck' 
                                                onChange={(e) => this.onChangeMsgCheck(e.target.value)} 
                                                value='msgYes' 
                                            />
                                            <label htmlFor='receiveMsg'>받음</label>
                                        </span>
                                        <span>
                                            <input 
                                                type='radio' 
                                                id='nonReceiveMsg' 
                                                name='msgCheck' 
                                                onChange={(e) => this.onChangeMsgCheck(e.target.value)} 
                                                value='msgNo' 
                                            />
                                            <label htmlFor='nonReceiveMsg'>안받음(공단의 다양한 소식을 무료로 만나보세요)</label>
                                        </span>
                                    </div>
                                </div>
                            </li> 
                        </ul>

                        <div className='button-box'>
                            <button type='submit' className='submit-btn'>확인</button>
                            <button className='cancel-btn' onClick={this.onClickCancleBtn}>취소</button>
                        </div>

                    </form>
                </div>
                
            </div>
        );
    }
}

export default MemberComponent;