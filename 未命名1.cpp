#include <iostream>
#include <cstdlib> // 用于rand()和srand()
#include <ctime> // 用于time()
#include <map> // 用于存储骰型和出现次数
#include <algorithm> // 用于sort()
#include <vector> // 用于存储每次掷骰子的结果
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
    if(nums.back() == 5) return "五连";
    if(nums.back() == 4) return "四连";
    if(nums.back() == 3 && nums[nums.size()-2] == 2) return "葫芦";
    if(nums.back() == 3) return "三连";
    if(count.size() == 3 && nums[2] == 2 && nums[1] == 2) return "双对";
    if(count.size() == 5) {
        if(count.rbegin()->first - count.begin()->first == 4) return "大顺";
		if(dice[0]==1&&dice[1]==2&&dice[2]==3&&dice[3]==4||dice[1]==3&&dice[2]==4&&dice[3]==5&&dice[4]==6){
			return "小顺";
    }
}
	if(count.size()==4){
		if(count.rbegin()->first - count.begin()->first == 3) return "小顺";
	}
    return "其他";
	
}

int main() {
    srand(time(0)); // 使用当前时间作为随机数种子

    std::map<std::string, int> diceRolls; // 存储骰型和出现次数

    for(int i = 0; i < 10000; ++i) {
        std::vector<int> roll;
        for(int j = 0; j < 5; ++j) {
            roll.push_back(rand() % 6 + 1); // 生成1到6的随机数
        }
        sort(roll.begin(), roll.end());
        std::string rollStr = "";
        for(int num : roll) {
            rollStr += std::to_string(num);
        }
        diceRolls[judgeDiceType(roll)]++; // 增加对应骰型的出现次数
    }

    // 输出各种骰型出现的次数
    for(auto it = diceRolls.begin(); it != diceRolls.end(); ++it) {
        std::cout << "骰型 " << it->first << " 出现了 " << it->second << " 次\n";
    }

    return 0;
}

