// run.js := contractを実行するためのスクリプト
/*
  非同期処理 async/await
  await が先頭についている処理が終わるまで、main 関数の他の処理は行われません
*/
const main = async () => {


  // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // const waveContract = await waveContractFactory.deploy();
  // console.log("Contract added to:", waveContract.address);
  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();
  // console.log(waveCount.toNumber());
  // /**
  //  * 「👋（wave）」を送る
  //  */
  // let waveTxn = await waveContract.wave("A message!");
  // await waveTxn.wait(); // トランザクションが承認されるのを待つ（テスト:1回目）
  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  // await waveTxn.wait(); // トランザクションが承認されるのを待つ（テスト:2回目）
  // let allWaves = await waveContract.getAllWaves();
  // console.log(allWaves);

  // // hre.ethers.getSigners() は Hardhat が提供する任意のアドレスを返す関数
  // const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();
  // /*
  //   WavePortal コントラクトをコンパイル
  //   コントラクトがコンパイルされたら、コントラクトを扱うために必要なファイルが artifacts ディレクトリの直下に生成される
  //   hre.ethers.getContractFactory について getContractFactory 関数は、
  //   デプロイをサポートするライブラリのアドレスと WavePortal コントラクトの連携を行う
  //  */
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // /*
  //   Hardhat がローカルの Ethereum ネットワークを、コントラクトのためだけに作成します。
  //   スクリプトの実行が完了した後、そのローカル・ネットワークを破棄します。
  //   コントラクトを実行するたびに、毎回ローカルサーバを更新するかのようにブロックチェーンが新しくなります.
  //   常にゼロリセットとなるので、エラーのデバッグがしやすくなります。
  // */ 
  const waveContract = await waveContractFactory.deploy();
  console.log("Contract added to:", waveContract.address);


  // /*
  //   WavePortal コントラクトが、ローカルのブロックチェーンにデプロイされるまで待つ処理を行っています。
  //   Hardhat は実際にあなたのマシン上に「マイナー」を作成し、ブロックチェーンを構築してくれます。
  //   constructor は、コントラクトがデプロイされるときに初めて実行されます。
  // */
  // const wavePortal = await waveContract.deployed();

  // // wavePortal.address はデプロイされたコントラクトのアドレスを出力
  // console.log("Contract deployed to:", wavePortal.address);
  // // owner.address = deployした人のaddress(今回は自分)
  // console.log("Contract deployed by:", owner.address);

  
  let waveCount;
  // // getTotalWaves() を呼び出し、既存の「👋（wave）」の総数を取得
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());


  // // ユーザーが新しい「👋（wave）」を送ったことを承認するまで、コントラクトからの応答をフロントエンドが待機するよう設定
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();
  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");


  // waveCount = await waveContract.getTotalWaves();

  // waveTxn = await waveContract.connect(randomPerson1).wave();
  await waveTxn.wait();
  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  // waveCount = await waveContract.getTotalWaves();

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();