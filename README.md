# water-quality	

## Preperation
❏ 테스트 시스템 사양은 다음과 같습니다. 
- Ubuntu 18.04
- Python 3.7.9
- Tensorflow-gpu 2.4.1
- CUDA 11.1
- cuDnn 8.0.4

❏ 데이터 수집     

본 튜토리얼은 한강의 가평 자동측정망을 대상으로 5가지의 항목 예측을 
시행합니다.    

예측에 필요한 데이터 파일(.xlsx)을 준비합니다.     

예측 대상지점인 “가평”과 상류 2개의 지점인 “의암호”, “서상“ 의 자동측정망과 ”대성리“, ”청평댐3“, ”남이섬“, ”가평천3“, ”춘성교“, ”의암“, ”춘천“, ”춘천댐1“, ”춘천댐3” 의 수질측정망, “조종천3”, “청평”, “가평천3”, “춘성교”, “화천”의 총량측정망의 2013년 ~ 2020년 까지의 (총 136개의)엑셀 파일을 준비합니다.
> [data]->[han] 폴더에 측정망별로 엑셀파일이 존재합니다.     

## Install Libraries
필요 Library를 설치 합니다.    
 
```bash
$ pip install –r requirement.txt
```

## Run 
1. [input] 폴더안의 input.json을 변경 합니다.     
input.json 의 형식은 다음과 같습니다.     
```json
    "file": {
        "watershed": "han"
    },
    "gain": {
        "train": false,
        "max_epochs": 2000,
        "batch_size": 32,
        "input_width": 120,
        "label_width": 120,
        "shift_width": 120,
        "fill_width": 3,
        "miss_rate": 0.2
    },
    "rnn": {
        "train": false,
        "max_epochs": 15,
        "target_column": "do",
        "batch_size": 128,
        "input_width": 240,
        "label_width": 120,
        "predict_day": 5
    }
}
```
- watershed :     
강 유역을 선택하는 항목으로 “han”, “nak”, “geum”, “yeong”을 입력할 수 있습니다. han을 입력할 경우 [input] 폴더 안에 han.json  파일이 존재해야 합니다.  (han.json은 한강의 예측에 사용될 데이터(엑셀파일)가 명시된 파일입니다.)    
- gain :     
data imputation의 train 여부와 epoch등의 파라메터를 정의 합니다.     
- rnn :     
AI 예측 모델의 train 여부와 epoch, 예측항목 등의 파라메터를 정의 합니다.    
2. AI 모델 예측 실행    
input.json을 변경 후 다음의 명령어로 AI 모델을 실행합니다.      
```bash
$ python main.py
```
이후 input.json의 "target_column"을 “toc”, ”tn”, ”tp“, ”chl-a“로 변경하며 각각의 항목을 테스트 합니다.     
(또한 강 유역별로 변경하며 테스트 가능합니다. ”nak“, ”geum“, ”yeong”)        

## Test Result
예측 일자 5일 후를 기준으로 4대강의 5가지 항목을 테스트한 결과입니다.     

측정지표 NSE 수치 범위    

||**Very Good**|**Good**|**Satisfactory**|**Not Satisfatory**|
|:---:|:---:|:---:|:---:|:---:|
|NSE|  0.80 > |0.70 ≤ NSE ≤ 0.80| 0.50 <NSE < 0.70|    ≤0.50|    

    
        
            
            

|**유역**|**측정항목**|**NSE**|**MAE**|**비고**|
|:---:|:---:|:---:|:---:|:---:|
|한강|do|0.9152|0.3760|Very Good|
||toc|0.6799|0.1021|Satisfactory|
||tn|0.7119|0.0809|Good|
||tp|0.4021|0.0015|Not Satisfactory|
||chl-a|0.7019|2.3804|Good|
|낙동강|do|0.5112|0.8398|Satisfactory|
||toc|0.6251|0.3020|Satisfactory|
||tn|0.7780|0.2517|Good|
||tp|0.5092|0.0056|Satisfactory|
||chl-a|0.4822|6.0130|Not Satisfactory|
|영산강|do|0.5651|1.4165|Satisfactory|
||toc|0.5617|0.3801|Satisfactory|
||tn|0.7760|0.4784|Good|
||tp|0.2091|0.0206|Not Satisfactory|
||chl-a|0.6018|18.4623|Satisfactory|
|금강|do|0.8738|0.4410|Very Good|
||toc|0.6741|0.0850|Satisfactory|
||tn|0.5099|0.0890|Satisfactory|
||tp|0.7422|0.0030|Good|
||chl-a|0.1075|0.8840|Not Satisfactory|



	

<!--stackedit_data:
eyJoaXN0b3J5IjpbODY1MDI0Mzk5LC0xODg5MTI4MTE2LDI1Nz
g5MjU3NCwyMDI4OTA1NTAyLC0yNjIwMDk3NSwtMjAyMTkzNDYw
Nyw2OTM0NzgzMzQsNTE0NjE3NTMwLC0xNDEzMjQ4ODgzXX0=
-->