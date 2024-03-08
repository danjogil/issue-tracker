"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  //   if (!issue) return <Skeleton height="2rem" />;

  const assignStatus = (value: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: value,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  //   const assignStatus = (value: Status) => {
  //     try {
  //       axios.patch("/api/issues/" + issue.id, {
  //         status: value,
  //       });
  //     } catch (error) {
  //       toast.error("Changes could not be saved");
  //     }
  //   };

  const statuses = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={assignStatus}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
