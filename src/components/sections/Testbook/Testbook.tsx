import React from "react";
import { useParams } from "react-router";
import Layout from "../../layout/Layout/Layout";

export const Testbook: React.FC = () => {
  const { slug } = useParams();

  return <Layout>Testbook - {slug}</Layout>;
};
