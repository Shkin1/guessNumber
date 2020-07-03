package com.company;

import java.util.Scanner;

import java.util.Random;

public class guessNumberGame {

    public static void main(String[] args) {
        // write your code here
        Random r = new Random();

        int randomNum = r.nextInt(100) + 1;

        Scanner sc = new Scanner(System.in);

        while (true){
            for (int i = 1; i <= 5; i++) {
                System.out.println("请输入您第" + i + "次猜测的数字！");
                int guessNum = sc.nextInt();
                if(i==5){
                    System.out.println("您的五次猜测机会已使用完毕");
                    if(guessNum==randomNum){

                        System.out.println("恭喜您,猜对了 ！");
                    }else {
                        System.out.println("很遗憾,您猜错了 ");
                        System.out.println("正确答案是" + randomNum);
                    }
                    break;
                }
                if (guessNum > randomNum){
                    System.out.println("猜测数字大于随机数！");
                }else if(guessNum < randomNum){
                    System.out.println("猜测数字小于随机数！");
                }else{
                    System.out.println("恭喜您,猜对了 ！");
                    break;
                }
            }
            System.out.println("游戏结束！");
            break;
        }
    }
}