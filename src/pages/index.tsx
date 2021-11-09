import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { HomeContent } from "@components/home/home-content";

const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>NextJS Solana Starter Kit</title>
        <meta
          name="description"
          content="Everything you need to start your Solana dApp"
        />
      </Head>
      <PageContainer>
        <Header />
        <HomeContent />
      </PageContainer>
    </>
  );
};

export default Home;
