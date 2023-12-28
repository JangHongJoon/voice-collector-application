import React, { useState } from 'react';

function RecordInfoScreen() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    birthdate: '',
    gender: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleRecordStart = () => {
    // 녹음 시작 로직 추가
    console.log('녹음 시작');
  };

  return (
    <form>
      <div>
        <h2>정보 입력</h2>
      </div>
      <div>
        <input
          type="text"
          id="id"
          placeholder="아이디"
          value={formData.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <input
          type="text"
          id="name"
          placeholder="이름"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <input
          type="text"
          id="birthdate"
          placeholder="생년월일"
          value={formData.birthdate}
          onChange={(e) => handleInputChange('birthdate', e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <label>
          <input
            type="radio"
            value="남"
            checked={formData.gender === '남'}
            onChange={() => handleRadioChange('남')}
          />
          남
        </label>
        <label>
          <input
            type="radio"
            value="여"
            checked={formData.gender === '여'}
            onChange={() => handleRadioChange('여')}
          />
          여
        </label>
      </div>
      <br></br>

      <div>
        <button type="button" onClick={handleRecordStart}>
          녹음 시작
        </button>
      </div>
    </form>
  );
}

export default RecordInfoScreen;
