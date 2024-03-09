"use client";

import { Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/app/components";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={searchParams.get("assignee") || ""}
      onValueChange={(assignee) => {
        const params = new URLSearchParams();
        if (assignee !== "ALL") params.append("assignee", assignee);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Item value={"ALL"}>All</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id || "ALL"}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default IssueAssigneeFilter;
