package com.example.exp6.repository;

import com.example.exp6.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    @Query("""
            select distinct u
            from AppUser u
            join u.roles r
            where lower(r.name) = lower(:roleName)
            """)
    Page<AppUser> findUsersByRole(@Param("roleName") String roleName, Pageable pageable);
}
