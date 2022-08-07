import React from "react";
import Link from "next/link";
import { Button } from "antd";
import Layout from "@/components/layout/Layout";

const FourOhFour = () => {
  return (
    <Layout title="404">
      <h1 className="white">404 - Page Not Found</h1>
      <Link href="/">
        <Button className="big" type="link">
          Go back home
        </Button>
      </Link>
    </Layout>
  );
};

export default FourOhFour;
