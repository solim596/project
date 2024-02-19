const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const xlsx = require('xlsx');

// Excel 파일 읽기
const workbook = xlsx.readFile('F:/P/delivery.xlsx');
const sheetName = workbook.SheetNames[0]; // Excel 시트 이름
const worksheet = workbook.Sheets[sheetName]; // 첫 번째 시트

// 데이터 추출
const data = xlsx.utils.sheet_to_json(worksheet);

// 정렬 및 데이터 처리
const age_order = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
data.forEach(row => {
    row['연령대'] = age_order.indexOf(row['연령대']);
});
data.sort((a, b) => a['연령대'] - b['연령대']);

router.get('/age/:num', (req, res) => {
    const { num } = req.params;
    const age_group = determineAgeGroup(num);
    
    if (age_group) {
        const most_ordered_category = getMostOrderedCategory(data, age_group);
        res.json({ 'age': most_ordered_category });
    } else {
        res.json({ 'age': '알수없음' });
    }
});

function determineAgeGroup(num) {
    if (num >= 0 && num < 20) {
        return 0;
    } else if (num < 30) {
        return 1;
    } else if (num < 40) {
        return 2;
    } else if (num < 50) {
        return 3;
    } else if (num < 60) {
        return 4;
    } else if (num >= 60) {
        return 5;
    } else {
        return null;
    }
}

function getMostOrderedCategory(data, age_group) {
    const filtered_data = data.filter(row => row['연령대'] === age_group);
    const counts = {};
    
    filtered_data.forEach(row => {
        const category = row['최다주문분류'];
        counts[category] = (counts[category] || 0);
    });
    
    const mostOrderedCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return mostOrderedCategory;
}

module.exports = router;