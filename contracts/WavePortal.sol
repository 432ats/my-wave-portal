// SPDX-License-Identifier: UNLICENSED
// Solidity コンパイラのバージョン
pragma solidity ^0.8.4;

// コンソールログをターミナルに出力するために Hardhat の console.sol のファイルをインポート
import "hardhat/console.sol";

// contract はコントラクトを定義するためのクラス
contract WavePortal {

    uint256 totalWaves;
    /**
    NewWaveイベントの作成: ユーザーのアドレス（from）, ユーザーが wave してきた時刻（timestamp）, ユーザーのメッセージ（message）
     */
    event NewWave(address indexed from, uint256 timestamp, string message);
    
    /*
    * Waveという構造体を作成。
    * 構造体の中身は、カスタマイズすることができます。
    */
    struct Wave {
        address waver; //「👋（wave）」を送ったユーザーのアドレス
        string message; // ユーザーが送ったメッセージ
        uint256 timestamp; // ユーザーが「👋（wave）」を送った瞬間のタイムスタンプ
    }

    /*
    * 構造体の配列を格納するための変数wavesを宣言。
    * これで、ユーザーが送ってきたすべての「👋（wave）」を保持することができます。
    */
    Wave[] waves;

    // contract は 1 つの constructor しか持つことができない
    // constructor は、スマートコントラクトの作成時に一度だけ実行され、contract の状態を初期化するために使用される
    // constructor が実行された後、コードがブロックチェーンにデプロイされる
    constructor() {
        console.log("WavePortal - Smart Contract!");
    }

    // 👋（wave）の回数を記録する wave() 関数
    function wave(string memory _message) public {
        totalWaves += 1;
        // msg.sender に入る値は、ずばり、関数を呼び出した人（＝あなたに「👋（wave）」を送った人）のウォレットアドレス
        console.log("%s waved w/ message %s", msg.sender, _message);

        /*
         * 「👋（wave）」とメッセージを配列に格納。
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));

        /*
         * コントラクト側でemitされたイベントに関する通知をフロントエンドで取得できるようにする。
         */
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    /*
     * 構造体配列のwavesを返してくれるgetAllWavesという関数を追加。
     * これで、私たちのWEBアプリからwavesを取得することができます。
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    // view 関数は、読み取り専用の関数であり、呼び出した後に関数の中で定義された状態変数が変更されないようにします。
    function getTotalWaves() public view returns (uint256) {
        // コントラクトが出力する値をコンソールログで表示する。
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}