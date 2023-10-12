#include <iostream>
#include <cstdlib> // ����rand()��srand()
#include <ctime> // ����time()
#include <map> // ���ڴ洢���ͺͳ��ִ���
#include <algorithm> // ����sort()
#include <vector> // ���ڴ洢ÿ�������ӵĽ��
using namespace std;
std::string judgeDiceType(const std::vector<int>& dice) {
    std::map<int, int> count;
    for(int i : dice) {
        count[i]++;
    }
    std::vector<int> nums;
    for(auto& p : count) {
        nums.push_back(p.second);
    }
    sort(nums.begin(), nums.end());
	cout<<nums.size()<<endl;
	for(int i=0;i<5;i++){
		cout<<nums[i];
	}
	cout<<endl;
    if(nums.back() == 5) return "����";
    if(nums.back() == 4) return "����";
    if(nums.back() == 3 && nums[nums.size()-2] == 2) return "��«";
    if(nums.back() == 3) return "����";
    if(count.size() == 3 && nums[2] == 2 && nums[1] == 2) return "˫��";
    if(count.size() == 5) {
        if(count.rbegin()->first - count.begin()->first == 4) return "��˳";
		if(dice[0]==1&&dice[1]==2&&dice[2]==3&&dice[3]==4||dice[1]==3&&dice[2]==4&&dice[3]==5&&dice[4]==6){
			return "С˳";
    }
}
	if(count.size()==4){
		if(count.rbegin()->first - count.begin()->first == 3) return "С˳";
	}
    return "����";
	
}

int main() {
    srand(time(0)); // ʹ�õ�ǰʱ����Ϊ���������

    std::map<std::string, int> diceRolls; // �洢���ͺͳ��ִ���

    for(int i = 0; i < 10000; ++i) {
        std::vector<int> roll;
        for(int j = 0; j < 5; ++j) {
            roll.push_back(rand() % 6 + 1); // ����1��6�������
        }
        sort(roll.begin(), roll.end());
        std::string rollStr = "";
        for(int num : roll) {
            rollStr += std::to_string(num);
        }
        diceRolls[judgeDiceType(roll)]++; // ���Ӷ�Ӧ���͵ĳ��ִ���
    }

    // ����������ͳ��ֵĴ���
    for(auto it = diceRolls.begin(); it != diceRolls.end(); ++it) {
        std::cout << "���� " << it->first << " ������ " << it->second << " ��\n";
    }

    return 0;
}

