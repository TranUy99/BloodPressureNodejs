import joblib
import numpy as np
import sys

# Load mô hình từ tệp
model = joblib.load('xgboost_model.pkl')

# Nhận dữ liệu từ Node.js qua tham số dòng lệnh
SystolicPressure = float(sys.argv[1])
DiastolicPressure = float(sys.argv[2])
PulsePressure = float(sys.argv[3])
HeartRate = float(sys.argv[4])
BodyTemperature = float(sys.argv[5])

# Tạo một mảng numpy để chứa giá trị tham số
x = np.array([SystolicPressure, DiastolicPressure, PulsePressure, HeartRate, BodyTemperature]).reshape(1, -1)

# Thực hiện dự đoán bệnh tim
result = model.predict(x)

# In kết quả để trả về cho Node.js
print(result[0])
